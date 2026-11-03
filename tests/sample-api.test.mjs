import test from "node:test";
import assert from "node:assert/strict";
import {
  parsePublicUser,
  parsePublicUsers,
  parsePublicUserWrite,
  parseSampleCarts,
} from "../lib/sample-api-schema.ts";

test("public user parsing removes API credentials before the UI sees them", () => {
  const user = parsePublicUser({
    id: 1,
    username: "sample",
    email: "sample@example.com",
    password: "must-not-leak",
    name: { firstname: "Sample", lastname: "Shopper" },
    address: { city: "Demo City", unknown: "omit" },
  });
  assert.equal(user.username, "sample");
  assert.equal("password" in user, false);
  assert.equal("unknown" in user.address, false);
  assert.throws(() => parsePublicUsers([{ username: "missing id" }]));
  assert.deepEqual(parsePublicUserWrite({ id: 3, password: "must-not-leak" }), {
    id: 3,
  });
});

test("sample cart parsing rejects malformed external product lines", () => {
  const valid = {
    id: 1,
    userId: 2,
    date: "2020-03-02T00:00:00.000Z",
    products: [{ productId: 3, quantity: 2 }],
  };
  assert.deepEqual(parseSampleCarts([valid]), [valid]);
  assert.throws(() =>
    parseSampleCarts([
      { ...valid, products: [{ productId: 3, quantity: -1 }] },
    ]),
  );
});
