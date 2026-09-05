# Turnstile Integration

## Backend Gate

Inside the existing handler, before side effects, adapt this Node/fetch shape to the backend. The browser sends `cf-turnstile-response` (or the agreed JSON token field) to this handler; it never calls Siteverify itself.

```js
const expectedAction = 'signup';
const expectedHostnames = new Set(
  (process.env.TURNSTILE_HOSTNAMES ?? '').split(',').map(h => h.trim()).filter(Boolean),
);
const secret = process.env.TURNSTILE_SECRET;
if (typeof token !== 'string' || token.length === 0 || token.length > 2048 ||
    !secret || expectedHostnames.size === 0) {
  return res.status(403).send('forbidden');
}

let result;
try {
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    signal: AbortSignal.timeout(10_000),
    body: new URLSearchParams({ secret, response: token }),
  });
  if (!r.ok) throw new Error(`siteverify ${r.status}`);
  result = await r.json();
} catch {
  return res.status(403).send('forbidden');
}
if (result?.success !== true || result.action !== expectedAction ||
    !expectedHostnames.has(result.hostname)) {
  return res.status(403).send('forbidden');
}
// Existing handler logic runs here, unchanged.
```

`remoteip` is optional; include it only from a trusted proxy/client-IP source, not arbitrary forwarded headers. Production `TURNSTILE_HOSTNAMES` excludes `localhost` and `127.0.0.1`. Apply this fail-closed contract even when a framework example omits a timeout or input check. A pre-existing stub stays a gated stub, not a new delivery service.

## Frontend and Tokens

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<form action="/signup" method="POST">
  <!-- Existing inputs unchanged. -->
  <div class="cf-turnstile" data-sitekey="<SITEKEY>" data-action="signup"></div>
  <button type="submit">Sign up</button>
</form>
```

Tokens are single-use. Native forms navigating away need no reset. A same-page submission uses explicit rendering, retains each surface's widget ID, and calls `window.turnstile.reset(widgetId)` after completion (including errors) before retry. Multiple surfaces must not share/reset an unspecified ID. Preserve widget clearance level; Siteverify remains mandatory with pre-clearance.

For Pages, use the existing Pages Function or [Turnstile plugin](https://developers.cloudflare.com/pages/functions/plugins/turnstile/); do not add a backend to a purely static site without separate scope. Workers call the same Siteverify endpoint.

## CAPTCHA Migration

Detect reCAPTCHA via `google.com/recaptcha/api.js`, `g-recaptcha`, `6L...` sitekeys, or `/recaptcha/api/siteverify`; hCaptcha via `js.hcaptcha.com/1/api.js`, `h-captcha`, or `hcaptcha.com/siteverify`. Confirm the migration scope before replacement.

- Replace the script, widget class/sitekey, and token field (`g-recaptcha-response` or `h-captcha-response` to `cf-turnstile-response`). Point backend verification to the Turnstile endpoint.
- Replace obsolete secret bindings with `TURNSTILE_SECRET` only after the new integration is validated and removal is approved.
- Preserve valid custom actions from `grecaptcha.execute`; otherwise assign a stable action (1-32 letters/numbers/underscores/hyphens). Verify the same action server-side.
- Turnstile has no reCAPTCHA v3 score. Surface the policy change explicitly: accept only `success === true`, matching action and hostname.
- Do not auto-migrate reCAPTCHA Enterprise; consult the [migration guide](https://developers.cloudflare.com/turnstile/migration/recaptcha/).

## Validation

Exercise a real successful request and reject replay through the actual backend. Also check missing/invalid tokens, mismatched action/hostname, failed/non-JSON/non-2xx Siteverify, and same-page retry resets. The [validation cases](../tests/validation.md) distinguish dummy credential probes from destination verification. Invalid API credentials go through the auth probe again; expired/redeemed response tokens need a fresh widget token, not account reauthentication.
