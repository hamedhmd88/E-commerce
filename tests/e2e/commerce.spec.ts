import { expect, test } from "@playwright/test";

const cartItem = {
  id: 1,
  title: "Demo catalog item",
  price: 40,
  image: "/placeholder.svg",
  quantity: 1,
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript((item) => {
    if (localStorage.getItem("cart") === null)
      localStorage.setItem("cart", JSON.stringify([item]));
  }, cartItem);
});

async function fillCheckout(page: import("@playwright/test").Page) {
  await page.goto("/checkout");
  await page.getByLabel("Email Address").fill("shopper@example.com");
  await page.getByLabel("First Name").fill("Demo");
  await page.getByLabel("Last Name").fill("Shopper");
  await page.getByLabel("Address", { exact: true }).fill("123 Example St");
  await page.getByLabel("City").fill("Example City");
  await page.getByLabel("State").fill("CA");
  await page.getByLabel("ZIP Code").fill("12345");
  await page.getByRole("checkbox", { name: /local demo order only/i }).check();
}

test("demo checkout saves an order with matching confirmation and history", async ({
  page,
}) => {
  await page.goto("/cart");
  await expect(page.getByText("Demo catalog item")).toBeAttached();
  await page.getByLabel("Demo promotion code").fill("SAVE10");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Applied: SAVE10")).toBeVisible();

  await fillCheckout(page);
  await expect(page.getByText("Demo promotion (SAVE10)")).toBeVisible();
  await page.getByRole("button", { name: /Place demo order/i }).click();
  await expect(page).toHaveURL(/\/order-success\?id=DEMO-/);
  const orderId = new URL(page.url()).searchParams.get("id");
  expect(orderId).toMatch(/^DEMO-/);
  await expect(page.getByText(orderId!, { exact: true })).toBeVisible();
  await expect(page.getByText("Demo catalog item × 1")).toBeVisible();
  await expect(page.getByText("$49.19", { exact: true })).toBeVisible();
  await page.goto("/cart");
  await expect(page.getByText("Your cart is empty")).toBeVisible();

  await page.goto("/account/orders");
  await expect(page.getByText(orderId!, { exact: true })).toBeVisible();
  await page.getByRole("link", { name: new RegExp(orderId!) }).click();
  await expect(page.getByText(orderId!, { exact: true })).toBeVisible();
});

test("simulated payment failure preserves the cart and creates no order", async ({
  page,
}) => {
  await fillCheckout(page);
  await page
    .getByRole("radio", { name: "Simulate a declined payment" })
    .check();
  await page.getByRole("button", { name: /Place demo order/i }).click();
  await expect(
    page.getByText("Demo payment declined as requested.", { exact: false }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/checkout/);
  await page.goto("/cart");
  await expect(page.getByText("Demo catalog item")).toBeAttached();
  await page.goto("/account/orders");
  await expect(page.getByText("No orders yet")).toBeVisible();
});
