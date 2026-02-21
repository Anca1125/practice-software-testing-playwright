import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly cartIcon: Locator;
  readonly productLinks: Locator;
  readonly productName: Locator;
  readonly addToCartProduct: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly productTotalPrice: Locator;
  readonly deleteProductfromCart: Locator;
  readonly continueShopping: Locator;
  readonly proceedToCheckout: Locator;
  readonly emptyCartMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.cartIcon = page.locator('a[href="/checkout"]');
    this.productLinks = page.locator('[data-test="product-name"]');
    this.productName = page.locator('[data-test="product-title"]');
    this.addToCartProduct = page.locator('[data-test="add-to-cart"]');
    this.productQuantity = page.locator('[data-test="product-quantity"]');
    this.productPrice = page.locator('[data-test="product-price"]');
    this.productTotalPrice = page.locator('[data-test="line-price"]');
    this.deleteProductfromCart = page.locator("a.btn-danger");
    this.continueShopping = page.locator('[data-test="continue-shopping"]');
    this.proceedToCheckout = page.locator('[data-test="proceed-1"]');
    this.emptyCartMessage = page.getByText("The cart is empty");
  }
  async openCart() {
    await this.cartIcon.click();
  }
  async deleteProduct() {
    await this.deleteProductfromCart.click();
  }
}
