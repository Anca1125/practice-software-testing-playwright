import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { ProductDetailsPage } from "../pages/product.details.page";

test.describe("product details", () => {
  let productDetailsPage: ProductDetailsPage;
  test.beforeEach(async ({ page }) => {
    productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.goToProductDetails();
  });
  test("product details - should display complete product information", async ({
    page,
  }) => {
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.productPrice).toBeVisible();
    await expect(productDetailsPage.addToCartProduct).toBeVisible();
    await expect(productDetailsPage.productRatingBadge).toBeVisible();
    await expect(productDetailsPage.productDescription).toBeVisible();
    await expect(productDetailsPage.productCategory).toBeVisible();
    await expect(productDetailsPage.productBrand).toBeVisible();
    await expect(productDetailsPage.productQuantity).toBeVisible();
    await expect(productDetailsPage.addToCartProduct).toBeVisible();
    await expect(productDetailsPage.addToFavourites).toBeVisible();
  });
  test("product details - user is able to input a quantity", async ({
    page,
  }) => {
    await productDetailsPage.setInputQuantity(4);
    await expect(productDetailsPage.productQuantity).toHaveValue("4");
  });
  test("product details - negative scenario -  sistem does not accept 0 as input for quantity(min value=1)", async ({
    page,
  }) => {
    await productDetailsPage.setInputQuantity(0);
    await expect(productDetailsPage.productQuantity).toHaveValue("1");
  });
  test("product details - negative scenario -  sistem does not accept more than 9 digits as input for quantity(max value=999999999)", async ({
    page,
  }) => {
    await productDetailsPage.setInputQuantity(9999999999);

    await expect(productDetailsPage.productQuantity).toHaveValue("999999999");
  });
  test("product details - should have 1 as default input value", async ({
    page,
  }) => {
    await expect(productDetailsPage.productQuantity).toHaveValue("1");

    await productDetailsPage.productQuantity.clear();

    await expect(productDetailsPage.productQuantity).toHaveValue("1");

    await productDetailsPage.minusQuantity.click();

    await expect(productDetailsPage.productQuantity).toHaveValue("1");
  });
  test("product details - should increase the quantity when click on plus button", async ({
    page,
  }) => {
    await productDetailsPage.setInputQuantity(4);

    await expect(productDetailsPage.productQuantity).toHaveValue("4");

    await productDetailsPage.plusQuantity.click();
    await productDetailsPage.plusQuantity.click();
    await productDetailsPage.plusQuantity.click();
    await productDetailsPage.plusQuantity.click();
    await productDetailsPage.plusQuantity.click();
    await productDetailsPage.plusQuantity.click();

    await expect(productDetailsPage.productQuantity).toHaveValue("10");
  });

  test("product details - should not increase quantity beyond maximum limit", async ({
    page,
  }) => {
    await productDetailsPage.setInputQuantity(999999999);

    await expect(productDetailsPage.productQuantity).toHaveValue("999999999");

    for (let i = 0; i < 6; i++) {
      await productDetailsPage.plusQuantity.click();
    }
    await expect(productDetailsPage.productQuantity).toHaveValue("999999999");
  });
  test("product details - should reach maximum quantity when clicking plus button ", async ({
    page,
  }) => {
    await productDetailsPage.setInputQuantity(999999998);

    const currentValueString =
      await productDetailsPage.productQuantity.inputValue();
    const currentValue = parseInt(currentValueString);
    const maxValue = 999999999;
    const clicksNeeded = maxValue - currentValue;

    for (let i = 0; i < clicksNeeded; i++) {
      await productDetailsPage.plusQuantity.click();
    }
    await expect(productDetailsPage.productQuantity).toHaveValue("999999999");

    await expect(productDetailsPage.productQuantity).toHaveValue(
      maxValue.toString(),
    );
  });
  test("product details - add to cart -  user is able to add to cart products", async ({
    page,
  }) => {
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.cart).toHaveText("1");
    await expect(productDetailsPage.toastMessage).toBeVisible();
  });
  test("product details - add to favourite - should show error message when guest tries to add product to favourites", async ({
    page,
  }) => {
    await productDetailsPage.addProductsToFavourite();
    await expect(productDetailsPage.toastMessage).toBeVisible();
    await expect(productDetailsPage.toastMessage).toContainText("Unauthorized");
  });
});
