import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/home.page";

test.describe("Products catalog", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test("catalog products - homepage - product listing should load", async ({
    page,
  }) => {
    await expect(homePage.productsCard.first()).toBeVisible();
  });

  test("catalog products - homepage - product details page should open ", async ({
    page,
  }) => {
    await homePage.productsCard.first().click();

    await expect(page.getByText(" Combination Pliers ")).toBeVisible();
  });

  test("catalog products - homepage - should display categories correctly(navbar)", async ({
    page,
  }) => {
    await homePage.selectCategories("Other");

    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/category/other",
    );
  });

  test("catalog products - homepage - should display the contact link", async ({
    page,
  }) => {
    await homePage.openContactPage();

    await expect(page).toHaveURL("https://practicesoftwaretesting.com/contact");
  });

  test("catalog products - contact Form - user should be able to complete and sent contact form", async ({
    page,
  }) => {
    await homePage.openContactPage();
    await homePage.fillContactForm(
      "Misu",
      "Iliuta",
      "misu@iliuta.com",
      "Payments",
      "Cat costa Gourmetul? Este scump aici la dumneavoastra. La alt magazin era mai ieftin si o sa mergem sa cumparam de acolo",
    );
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Thanks for your message! We will contact you shortly.",
      );
      await dialog.accept();
    });
    await homePage.submitContactForm();

    await expect(homePage.contactSuccessMessage).toBeVisible();
  });

  test("catalog products - homepage - should display language options", async ({
    page,
  }) => {
    await homePage.selectLanguage("ES");

    await expect(page.getByText("Contacto")).toBeVisible();
  });

  test("products catalog - homepage - should sort products from A to Z", async ({
    page,
  }) => {
    await homePage.sortBy("Name (A - Z)");

    await expect(homePage.productsCard.first()).toContainText(
      "Adjustable Wrench",
    );

    const names = (await homePage.productsCard.allTextContents()).map((name) =>
      name.trim(),
    );

    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sortedNames);
  });

  test("products catalog - homepage - should sort products from low to high", async ({
    page,
  }) => {
    await homePage.sortBy("Price (Low - High)");

    await expect
      .poll(async () => {
        const pricesText = await homePage.productsPrices.allTextContents();

        const prices = pricesText.map((p) =>
          parseFloat(p.replace("$", "").trim()),
        );

        const sorted = [...prices].sort((a, b) => a - b);

        return prices.join() === sorted.join();
      })
      .toBe(true);
  });

  test("products catalog - homepage - should sort products from high to low", async ({
    page,
  }) => {
    await homePage.sortBy("Price (High - Low)");

    await expect
      .poll(async () => {
        const pricesText = await homePage.productsPrices.allTextContents();
        const prices = pricesText.map((p) =>
          parseFloat(p.replace("$", "").trim()),
        );

        const sorted = [...prices].sort((a, b) => b - a);

        return prices.join() === sorted.join();
      })
      .toBeTruthy();
  });

  test("products catalog - homepage - product should display active CO2 rating", async ({
    page,
  }) => {
    await homePage.productsCard.first().click();

    await expect(homePage.activeRating).toHaveCount(1);
    await expect(homePage.activeRating).toHaveText("D");
  });

  test("products catalog - homepage - each product should display a CO2 rating", async ({
    page,
  }) => {
    const productCount = await homePage.productsCard.count();
    const ratingCount = await homePage.productsCard.count();

    expect(ratingCount).toBe(productCount);
  });

  test("products should respect price range after slider move", async () => {
    await homePage.moveSlider(50, 50);

    const minText = await homePage.minSlider.getAttribute("aria-valuenow");
    const maxText = await homePage.maxSlider.getAttribute("aria-valuenow");

    const min = parseFloat(minText!);
    const max = parseFloat(maxText!);

    await expect
      .poll(async () => {
        const pricesText = await homePage.productsPrices.allTextContents();
        const prices = pricesText.map((p) =>
          parseFloat(p.replace("$", "").trim()),
        );
        return Math.min(...prices);
      })
      .toBeGreaterThanOrEqual(min);

    const pricesText = await homePage.productsPrices.allTextContents();
    const prices = pricesText.map((p) => parseFloat(p.replace("$", "").trim()));

    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(min);
      expect(price).toBeLessThanOrEqual(max);
    }
  });

  test("catalog products - homepage - category selection should filter products(sidebar)", async ({
    page,
  }) => {
    const checkbox = page.getByRole("checkbox", { name: "Hand Tools" });

    await homePage.filterCategory(" Hand Tools");

    await expect(checkbox).toBeChecked();
    await expect(homePage.productsCard.first()).toBeVisible();
  });

  test("catalog products - homepage - filter by brand", async ({ page }) => {
    const checkbox = page.getByRole("checkbox", { name: " ForgeFlex Tools" });

    await homePage.filterBrand(" ForgeFlex Tools");

    await expect(checkbox).toBeChecked();
    await expect(homePage.productsCard.first()).toBeVisible();
  });

  test("catalog products - homepage - filter sustenability", async ({
    page,
  }) => {
    const checkbox = page.getByRole("checkbox", {
      name: "Show only eco-friendly products",
    });
    const ecoBadgeProducts = page.locator('[data-test="eco-badge"]');

    await homePage.filterSustenability(" Show only eco-friendly products");

    await expect(checkbox).toBeChecked();
    await expect(ecoBadgeProducts.first()).toBeVisible();
  });

  test("catalog products - homepage - user is able to navigate on a specific page", async ({
    page,
  }) => {
    await homePage.getPageButton(4).click();

    await expect(homePage.activePage).toHaveText("4");
  });

  test("catalog products - homepage - user is able to navigate to the next page", async ({
    page,
  }) => {
    await homePage.nextButton.click();

    await expect(homePage.activePage).toHaveText("2");
  });

  test("catalog products - homepage - user is able to navigate to the previous page", async ({
    page,
  }) => {
    await homePage.getPageButton(4).click();
    await expect(homePage.activePage).toHaveText("4");

    await homePage.previousButton.click();
    await expect(homePage.activePage).toHaveText("3");
  });

  test("catalog products - homepage - previous is disabled on first page", async ({
    page,
  }) => {
    await homePage.getPageButton(1).click();

    await expect(homePage.activePage).toHaveText("1");
    await expect(homePage.previousButton.locator("..")).toHaveClass(/disabled/);
  });
  test("catalog products - homepage - user is able to search products", async ({
    page,
  }) => {
    const searchTerm = "Pliers";

    await homePage.searchProduct(searchTerm);

    await expect
      .poll(async () => {
        const names = await homePage.productsCard.allTextContents();

        return names.every((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      })
      .toBe(true);
  });
  test("catalog products - homepage - should return no result for invalid query", async ({
    page,
  }) => {
    await homePage.searchProduct("ciocan");
    await expect(homePage.productsCard).toHaveCount(0);
    await expect(homePage.noResultsMessage).toBeVisible();
  });
  test("catalog products - homepage - should work with lower case input", async ({
    page,
  }) => {
    const searchTerm = "pliers";

    await homePage.searchProduct(searchTerm);

    await expect(homePage.productsCard.first()).toContainText("Pliers");
  });
  test("catalog products - homepage - should work with partial match", async ({
    page,
  }) => {
    const searchTerm = "pli";

    await homePage.searchProduct(searchTerm);

    await expect(homePage.productsCard.first()).toBeVisible();

    const names = await homePage.productsCard.allTextContents();

    const hasMatch = names.some((name) =>
      name.toLowerCase().includes(searchTerm),
    );
    expect(hasMatch).toBeTruthy();
  });
});
