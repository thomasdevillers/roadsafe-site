import { expect, test } from "@playwright/test";
import { categories, products } from "../lib/site-data";

const staticRoutes = [
  "/",
  "/products",
  "/rentals",
  "/support",
  "/resources",
  "/about",
  "/contact",
  "/request-a-quote",
  "/privacy-policy",
  "/terms"
];

const catalogueRoutes = new Set([
  ...categories.map((category) => `/products/${category.path}`),
  ...products.map((product) => `/products/${product.path}`)
]);

async function loadLazyContent(page: import("@playwright/test").Page) {
  const reveals = page.locator(".reveal");
  const revealCount = await reveals.count();
  for (let index = 0; index < revealCount; index += 1) {
    await reveals.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(20);
  }
  const images = page.locator("img");
  const count = await images.count();
  for (let index = 0; index < count; index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(100);
  await page.evaluate(() => {
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = scrollBehavior;
  });
  await page.waitForTimeout(100);
}

for (const route of [...staticRoutes, ...catalogueRoutes]) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toHaveCount(1);
    await loadLazyContent(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const brokenImages = await page.locator("img").evaluateAll((images) =>
      images
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute("src"))
    );
    expect(brokenImages).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

test("mobile navigation opens and reaches products", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Products" })
    .click();
  await expect(page).toHaveURL(/\/products$/);
});

test("product quote link preselects equipment", async ({ page }) => {
  await page.goto("/products/variable-message-signs");
  await page.getByRole("link", { name: "Request this equipment" }).click();
  await expect(page.locator("select").first()).toHaveValue("variable-message-signs");
});

test("homepage rental range excludes purchase-only warning lights", async ({ page }) => {
  await page.goto("/");
  const rentalRange = page.locator("section").filter({
    has: page.getByRole("heading", {
      name: "The right equipment for every point of risk."
    })
  });

  await expect(rentalRange.getByText("Solar Warning Light")).toHaveCount(0);
  await expect(rentalRange.getByText("Double Arrow Light")).toHaveCount(0);
  await expect(rentalRange.getByText("Traffic Control Units")).toBeVisible();
  await expect(rentalRange.getByText("Solar Light Towers")).toBeVisible();
});

test("warning lights are a seven-product purchase-only range", async ({ page }) => {
  await page.goto("/products/warning-lights");
  await expect(page.getByText("Seven purchase-only products")).toBeVisible();
  await expect(page.locator(".product-grid").first().locator("article")).toHaveCount(7);

  await page.goto("/products/warning-lights/double-arrow-light");
  await expect(page.getByRole("heading", { name: "Double Arrow Light" })).toBeVisible();
  await expect(page.getByText("Purchase-only range")).toBeVisible();
  await expect(page.getByRole("link", { name: "Request purchase quote" })).toBeVisible();

  await page.goto("/products/warning-lights/sign-mounted-solar-light");
  await expect(page.getByRole("heading", { name: "Sign Mounted Solar Light" })).toBeVisible();
  await expect(page.getByAltText("Yellow sign-mounted solar warning light with amber LED lens"))
    .toHaveAttribute("src", /sign-mounted-solar-light-nobg/);

  await page.goto("/resources");
  const resource = page.locator(".resource-row").filter({ hasText: "Sign Mounted Solar Light" });
  await expect(resource).toBeVisible();
  await expect(resource.getByRole("link", { name: "Product details" }))
    .toHaveAttribute("href", "/products/warning-lights/sign-mounted-solar-light");
});

test("legacy arrow warning routes redirect to Double Arrow Light", async ({ page }) => {
  await page.goto("/products/warning-lights/arrow-warning-board");
  await expect(page).toHaveURL(/\/products\/warning-lights\/double-arrow-light$/);

  await page.goto("/arrow-warning");
  await expect(page).toHaveURL(/\/products\/warning-lights\/double-arrow-light$/);
});

test("purchase-only quotes omit rental period and mixed quotes restore it", async ({ page }) => {
  await page.goto("/request-a-quote?product=double-arrow-light");
  await expect(page.getByLabel("Product 1", { exact: true })).toHaveValue("double-arrow-light");
  await expect(page.getByText("Purchase only", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Rental period")).toHaveCount(0);

  await page.getByRole("button", { name: "Add another product" }).click();
  await page.getByLabel("Product 2", { exact: true }).selectOption("traffic-control-units");
  await expect(page.getByLabel("Rental period")).toHaveCount(1);
  await expect(page.getByText("Rental items only")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Where should we respond?" })).toBeVisible();
});

test("replacement hero and product imagery is served", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByAltText("Road construction crew working on newly laid asphalt at sunset")
  ).toHaveAttribute("src", /hero-roadworks/);

  await page.goto("/products/traffic-control-units");
  await expect(page.getByAltText("Roadsafe mobile traffic control units with warning arrows and signal lights"))
    .toHaveAttribute("src", /traffic-control-unit-nobg/);

  await page.goto("/products/solar-light-towers");
  await expect(
    page.getByAltText("Trailer-mounted Roadsafe solar light tower with raised LED lighting mast")
  ).toHaveAttribute("src", /solar-light-tower-nobg/);

  await page.goto("/products/warning-lights/solar-warning-light");
  await expect(page.getByAltText("Yellow Roadsafe solar work-zone warning light"))
    .toHaveAttribute("src", /solar-warning-light-nobg/);

  await page.goto("/products/warning-lights/beacon-light");
  await expect(page.getByAltText("Round amber Roadsafe LED beacon light"))
    .toHaveAttribute("src", /beacon-light-nobg/);

  await page.goto("/products/warning-lights/half-moon-road-stud");
  await expect(page.getByAltText("Pair of Roadsafe half moon solar road studs"))
    .toHaveAttribute("src", /half-moon-road-stud-nobg/);

  await page.goto("/products/speed-radars/speed-sentinel-classic");
  await expect(
    page.getByAltText("Roadsafe Speed Sentinel Classic vehicle-activated speed display")
  ).toHaveAttribute("src", /speed-sentinel-classic-nobg/);
});

test("quote supports single-page mode and development submission", async ({ page }) => {
  await page.goto("/request-a-quote?product=variable-message-signs");
  await page.getByRole("button", { name: "Single page" }).click();
  await expect(page.getByRole("button", { name: "Single page" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await page.getByLabel("Rental period").selectOption({ label: "1–4 weeks" });
  await page.getByLabel("Required date").fill("2026-12-15");
  await page.getByLabel("Project location").fill("Gqeberha, Eastern Cape");
  await page.getByLabel("Company").fill("Roadworks Test Company");
  await page.getByLabel("Contact name").fill("Test Contact");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Phone").fill("082 555 0101");
  await page.getByRole("button", { name: "Submit quote request" }).click();

  await expect(page).toHaveURL(/\/quote-confirmation\?ref=RST-/);
  await expect(page.getByRole("heading", { name: "Roadsafe has the requirement." })).toBeVisible();
});

test("quote can be submitted with only essential contact details", async ({ page }) => {
  await page.goto("/request-a-quote?product=traffic-control-units");
  await page.getByRole("button", { name: "Single page" }).click();

  await page.getByLabel("Contact name").fill("Quick Quote Test");
  await page.getByLabel("Email").fill("quick@example.com");
  await page.getByRole("button", { name: "Submit quote request" }).click();

  await expect(page).toHaveURL(/\/quote-confirmation\?ref=RST-/);
});

test("guided quote reaches contact details in two stages", async ({ page }) => {
  await page.goto("/request-a-quote");
  await page.locator("select").first().selectOption("traffic-control-units");
  await expect(page.getByRole("heading", { name: "Define the project." })).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Where should we respond?" })).toBeVisible();
});

test("key mobile routes have no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const routes = [
    "/",
    "/products",
    "/products/variable-message-signs",
    "/products/speed-radars",
    "/rentals",
    "/resources",
    "/contact",
    "/request-a-quote"
  ];

  for (const route of routes) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `${route} has horizontal overflow`).toBeLessThanOrEqual(1);
  }
});

test("key screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "test-results/home-viewport.png" });
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/home-desktop.png", fullPage: true });

  await page.goto("/products/variable-message-signs");
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/product-desktop.png", fullPage: true });

  await page.goto("/products/traffic-control-units");
  await page.screenshot({ path: "test-results/tcu-viewport.png" });
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/tcu-desktop.png", fullPage: true });

  await page.goto("/products/solar-light-towers");
  await page.screenshot({ path: "test-results/light-tower-viewport.png" });
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/light-tower-desktop.png", fullPage: true });

  await page.goto("/products/warning-lights");
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/warning-lights-desktop.png", fullPage: true });

  await page.goto("/request-a-quote?product=double-arrow-light");
  await page.locator(".quote-form-shell").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/purchase-quote-viewport.png" });
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/purchase-quote-desktop.png", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });

  await page.goto("/request-a-quote");
  await loadLazyContent(page);
  await page.screenshot({ path: "test-results/quote-mobile.png", fullPage: true });
});
