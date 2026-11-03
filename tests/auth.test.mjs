import test from "node:test";
import assert from "node:assert/strict";
import { userSchema } from "../lib/auth-constants.ts";

test("demo session validation rejects incomplete profiles and strips extra fields", () => {
  const valid = userSchema.parse({
    id: 1,
    username: "demo",
    email: "demo@example.com",
    name: { firstname: "Demo", lastname: "Shopper" },
    password: "never-store-this",
  });
  assert.equal("password" in valid, false);
  assert.equal(
    userSchema.safeParse({
      id: 1,
      username: "broken",
      email: "broken@example.com",
    }).success,
    false,
  );
});
