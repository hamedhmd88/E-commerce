import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("public pages and demo sign-in are usable", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/login");
  await page.getByLabel("Username").fill("demo");
  await page.getByLabel("Email").fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("demo12345");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/account/, { timeout: 30_000 });
});

test("contact demo reports submission without claiming delivery", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByLabel("Full Name *").fill("Demo Visitor");
  await page.getByLabel("Email Address *").fill("visitor@example.com");
  await page.getByLabel("Subject *").fill("Portfolio inquiry");
  await page.getByLabel("Message *").fill("This is a local demo message.");
  await page.getByRole("button", { name: "Submit Demo Message" }).click();
  await expect(page.getByText("Demo message recorded")).toBeVisible();
  await expect(
    page.getByText("No message was sent to a support team.", { exact: false }),
  ).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("catalog pages handle provider access failures without a server error", async ({
  page,
}) => {
  for (const route of ["/products", "/products/1", "/category/electronics"]) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} returned a server error`).toBeLessThan(
      500,
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByText("Request failed with status code 403"),
    ).toHaveCount(0);
  }
});

test("public routes fit the viewport and capture both themes", async ({
  page,
}, testInfo) => {
  for (const route of [
    "/",
    "/about",
    "/blog",
    "/faq",
    "/cart",
    "/contact",
    "/login",
    "/register",
    "/checkout",
    "/order-success",
    "/account",
    "/account/profile",
    "/account/wishlist",
    "/account/orders",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} returned a server error`).toBeLessThan(
      500,
    );
    await expect(page.locator("body")).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `${route} has horizontal overflow`).toBe(false);
  }

  mkdirSync("output/playwright", { recursive: true });
  for (const theme of ["light", "dark"]) {
    await page.addInitScript(
      (selected) => localStorage.setItem("theme", selected),
      theme,
    );
    await page.goto("/about");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));
    await page.screenshot({
      path: `output/playwright/about-${theme}-${testInfo.project.name}.png`,
      fullPage: true,
    });
  }
});
