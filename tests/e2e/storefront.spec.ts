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

test("unknown routes show a useful recovery page", async ({ page }) => {
  const response = await page.goto("/a-page-that-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("glass header compacts on scroll and restores at the top", async ({
  page,
}) => {
  await page.goto("/about");
  const header = page.getByRole("navigation", { name: "Main navigation" });
  const row = header.locator(".site-header-row");
  await expect(header).toHaveAttribute("data-scrolled", "false");
  const expandedHeight = await row.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await expect
    .poll(() =>
      row.evaluate((element) => element.getBoundingClientRect().height),
    )
    .toBeLessThan(expandedHeight);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toHaveAttribute("data-scrolled", "false");
});

test("back to top returns to the start of a long page", async ({ page }) => {
  await page.goto("/about");
  const control = page.getByRole("button", { name: "Back to top" });
  await expect(control).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(control).toBeVisible();
  await control.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("contact demo reports submission without claiming delivery", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByLabel("Your name").fill("Demo Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("Subject").fill("Portfolio inquiry");
  await page.getByLabel("Your message").fill("This is a local demo message.");
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

test("Persian product badges keep category and wishlist apart", async ({
  page,
}) => {
  await page
    .context()
    .addCookies([
      { name: "morrow-locale", value: "fa", url: "http://127.0.0.1:3100" },
    ]);
  await page.route("https://fakestoreapi.com/products", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(
        Array.from({ length: 9 }, (_, index) => ({
          id: index + 1,
          title: `Sample item ${index + 1}`,
          price: 29.99,
          description: "Portfolio fixture",
          category: "women's clothing",
          image:
            "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E",
          rating: { rate: 4.2, count: 48 },
        })),
      ),
    }),
  );
  await page.goto("/products");
  const card = page.locator(".catalog-product-card").first();
  await expect(card).toBeVisible();
  const overlap = await card.evaluate((element) => {
    const heart = element
      .querySelector("button[aria-pressed]")
      ?.getBoundingClientRect();
    const category = element
      .querySelector(".catalog-image-stage > span")
      ?.getBoundingClientRect();
    if (!heart || !category) return true;
    return (
      heart.left < category.right &&
      heart.right > category.left &&
      heart.top < category.bottom &&
      heart.bottom > category.top
    );
  });
  expect(overlap).toBe(false);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test("sample user writes include the API address shape and hide credentials", async ({
  page,
}) => {
  let requestBody: Record<string, unknown> | null = null;
  await page.route("https://fakestoreapi.com/users**", async (route) => {
    if (route.request().method() === "POST") {
      requestBody = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id: 11, password: "morrow-public-demo-only" }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "[]",
    });
  });
  await page.goto("/login");
  await page.getByLabel("Username").fill("demo");
  await page.getByLabel("Email").fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("demo12345");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/account/);
  await page.goto("/account/users/manage");
  await page.getByLabel("Username").fill("samplewriter");
  await page.getByLabel("Email").fill("writer@example.com");
  await page.getByLabel("First name").fill("Sample");
  await page.getByLabel("Last name").fill("Writer");
  await page.getByRole("button", { name: "Send POST request" }).click();
  await expect(
    page.getByText("POST returned a sample response.", { exact: false }),
  ).toBeVisible();
  expect(requestBody).toMatchObject({
    firstname: "Sample",
    lastname: "Writer",
    address: { geolocation: { lat: "0", long: "0" } },
  });
  await page.getByText("View API response").click();
  await expect(page.locator("pre")).not.toContainText("password");
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
