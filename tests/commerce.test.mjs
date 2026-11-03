import test from "node:test";
import assert from "node:assert/strict";
import { calculateCartPricing } from "../lib/cart-pricing.ts";
import {
  clearDemoOrders,
  createDemoOrder,
  getDemoOrders,
  saveDemoOrder,
} from "../lib/demo-orders.ts";
import {
  addCartItem,
  updateCartQuantity,
  cartSubtotal,
} from "../lib/cart-state.ts";

test("cart adds, increments, updates and removes without mutating previous state", () => {
  const product = { id: 1, title: "Item", price: 12, image: "item.jpg" };
  const first = addCartItem([], product);
  const second = addCartItem(first, product);
  assert.equal(first[0].quantity, 1);
  assert.equal(second[0].quantity, 2);
  assert.equal(cartSubtotal(second), 24);
  assert.equal(updateCartQuantity(second, 1, 3)[0].quantity, 3);
  assert.deepEqual(updateCartQuantity(second, 1, 0), []);
});

test("demo promotions carry the same total through cart and checkout", () => {
  assert.deepEqual(calculateCartPricing(40, "SAVE10"), {
    subtotal: 40,
    shipping: 9.99,
    tax: 3.2,
    discount: 4,
    total: 49.19,
  });
  assert.deepEqual(calculateCartPricing(40, "FREESHIP"), {
    subtotal: 40,
    shipping: 9.99,
    tax: 3.2,
    discount: 9.99,
    total: 43.2,
  });
  assert.equal(calculateCartPricing(50).shipping, 0);
});

test("saved demo order keeps its identifier and totals", () => {
  const values = new Map();
  globalThis.window = {};
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const order = createDemoOrder({
    email: "demo@example.com",
    name: "Demo Shopper",
    address: "123 Demo St",
    paymentMethod: "demo-standard",
    items: [{ id: 1, title: "Item", price: 40, image: "", quantity: 1 }],
    ...calculateCartPricing(40, "SAVE10"),
  });
  saveDemoOrder(order);
  assert.equal(getDemoOrders()[0].id, order.id);
  assert.equal(getDemoOrders()[0].total, 49.19);
  assert.equal(getDemoOrders()[0].status, "Simulated order placed");
  clearDemoOrders();
  delete globalThis.window;
  delete globalThis.localStorage;
});

test("demo orders remain usable when browser storage is blocked", () => {
  globalThis.window = {};
  globalThis.localStorage = {
    getItem: () => {
      throw new Error("Storage unavailable");
    },
    setItem: () => {
      throw new Error("Storage unavailable");
    },
    removeItem: () => {
      throw new Error("Storage unavailable");
    },
  };
  const order = createDemoOrder({
    email: "demo@example.com",
    name: "Demo Shopper",
    address: "123 Demo St",
    paymentMethod: "demo-standard",
    items: [{ id: 1, title: "Item", price: 40, image: "", quantity: 1 }],
    ...calculateCartPricing(40),
  });
  assert.equal(saveDemoOrder(order), false);
  assert.equal(getDemoOrders()[0].id, order.id);
  clearDemoOrders();
  assert.deepEqual(getDemoOrders(), []);
  delete globalThis.window;
  delete globalThis.localStorage;
});

test("malformed saved orders are excluded without hiding valid orders", () => {
  const values = new Map();
  globalThis.window = {};
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  clearDemoOrders();
  const order = createDemoOrder({
    email: "demo@example.com",
    name: "Demo Shopper",
    address: "123 Demo St",
    paymentMethod: "demo-standard",
    items: [{ id: 1, title: "Item", price: 40, image: "", quantity: 1 }],
    ...calculateCartPricing(40),
  });
  values.set(
    "portfolio-demo-orders-v1",
    JSON.stringify([{ id: "BROKEN", items: [] }, order]),
  );
  assert.deepEqual(
    getDemoOrders().map((item) => item.id),
    [order.id],
  );
  clearDemoOrders();
  delete globalThis.window;
  delete globalThis.localStorage;
});
