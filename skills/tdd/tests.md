# Good And Bad Tests

Good tests exercise observable behavior through a public interface:

```typescript
test("user can checkout with a valid cart", async () => {
  const result = await checkout(cartWithOneProduct, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

Avoid asserting internal calls:

```typescript
test("checkout calls paymentService.process", async () => {
  await checkout(cart, paymentMethod);
  expect(paymentService.process).toHaveBeenCalled();
});
```

Avoid tautological expected values:

```typescript
// Bad: repeats the implementation.
const expected = items.reduce((sum, item) => sum + item.price, 0);
expect(calculateTotal(items)).toBe(expected);

// Good: independent worked example.
expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
```

A good test:

- Describes behavior a caller cares about.
- Uses the public API.
- Has an independently known expected result.
- Fails when that behavior breaks.
- Survives internal refactoring.
