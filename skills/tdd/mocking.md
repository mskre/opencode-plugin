# When To Mock

Mock system boundaries only:

- External APIs
- Time and randomness
- Filesystems when a real temporary directory is impractical
- Databases when a disposable test database is impractical

Do not mock your own modules or internal collaborators. Pass boundary dependencies into the public seam when a deterministic substitute is needed.

Prefer specific boundary methods over a generic conditional mock:

```typescript
const api = {
  getUser: (id: string) => fetch(`/users/${id}`),
  createOrder: (data: OrderInput) =>
    fetch("/orders", { method: "POST", body: JSON.stringify(data) }),
};
```

Each test substitute should return one clear shape without recreating production branching logic.
