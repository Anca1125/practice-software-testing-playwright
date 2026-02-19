import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { CartPage } from "../pages/cart.page";
import { ProductDetailsPage } from "../pages/product.details.page";

test.describe("cart", () => {
  let cartPage: CartPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await productDetailsPage.goToProductDetails();
    await productDetailsPage.setInputQuantity(2);
    await productDetailsPage.addToCart();
    await cartPage.openCart();
  });
  test("cart - guest user - items, price, total price and quantity are visible in the cart", async ({
    page,
  }) => {
    await expect(cartPage.productName).toBeVisible();
    await expect(cartPage.productQuantity).toBeVisible();
    await expect(cartPage.productPrice).toBeVisible();
    await expect(cartPage.productTotalPrice).toBeVisible();
    await expect(cartPage.deleteProductfromCart).toBeVisible();
  });

  test("cart - guest user - should update quantity ehen input a number in cart", async ({
    page,
  }) => {
    await expect(cartPage.productQuantity).toHaveValue("2");

    await cartPage.productQuantity.fill("3");

    await expect(cartPage.productQuantity).toHaveValue("3");
  });
  test("cart - guest user - should calculate quantity added in the cart ", async ({
    page,
  }) => {
    await expect(cartPage.productQuantity).toHaveValue("2");

    const unitPriceText = await cartPage.productPrice.textContent();
    const unitPrice = parseFloat(unitPriceText!.replace("$", ""));
    const expectedTotal = unitPrice * 2;
    const formattedTotal = expectedTotal.toFixed(2);

    await expect(cartPage.productTotalPrice).toHaveText(`$${formattedTotal}`);
  });
  test("cart - guest user - should detele items from the cart", async ({
    page,
  }) => {
    await expect(cartPage.productQuantity).toHaveValue("2");
    await cartPage.deleteProductfromCart.click();
    await expect(cartPage.productName).toHaveCount(0);
    await expect(cartPage.emptyCartMessage).toHaveText(
      "The cart is empty. Nothing to display.",
    );
  });
  test.fixme(// Known bug: cart allows negative quantity and checkout
  "cart - guest user - should not allow checkout with negative quantity ", async ({
    page,
  }) => {
    await cartPage.productQuantity.fill("-5");
    await expect(cartPage.productQuantity).not.toHaveValue("-5");
    await cartPage.proceedToCheckout.click();
    await expect(page).not.toHaveURL(/success/);
  });
});
