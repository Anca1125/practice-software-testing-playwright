import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
  readonly productLinks: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productCategory: Locator;
  readonly productBrand: Locator;
  readonly productRatingBadge: Locator;
  readonly productDescription: Locator;
  readonly productQuantity: Locator;
  readonly inputQuantity: Locator;
  readonly plusQuantity: Locator;
  readonly minusQuantity: Locator;
  readonly addToCartProduct: Locator;
  readonly addToFavourites: Locator;
  readonly ecoBadge: Locator;
  // readonly errorMessageUnauthorized: Locator;
  readonly cart: Locator;
  readonly toastMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.productLinks = page.locator('[data-test="product-name"]');
    this.productName = page.locator('[data-test="product-name"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.productCategory = page.locator('[aria-label="category"]');
    this.productBrand = page.locator('[aria-label="brand"]');
    this.productRatingBadge = page.locator('[data-test="co2-rating-badge"]');
    this.productDescription = page.locator("#description");
    this.productQuantity = page.locator('[data-test="quantity"]');
    this.inputQuantity = page.locator("#quantity-input");
    this.plusQuantity = page.locator('[data-test="increase-quantity"]');
    this.minusQuantity = page.locator('[data-test="decrease-quantity"]');
    this.addToCartProduct = page.locator('[data-test="add-to-cart"]');
    this.addToFavourites = page.locator('[data-test="add-to-favorites"]');
    this.ecoBadge = page.locator('[data-test="eco-badge"]');
    //this.errorMessageUnauthorized = page;
    this.cart = page.locator('[data-test="cart-quantity"]');
    this.toastMessage = page.getByRole("alert");
  }
  async goToProductDetails() {
    await this.navigate("/");
    await this.productLinks.first().click();
  }
  async setInputQuantity(inputNumber: number) {
    await this.productQuantity.fill(inputNumber.toString());
  }
  async addToCart() {
    await this.addToCartProduct.click();
  }
  async addProductsToFavourite() {
    await this.addToFavourites.click();
  }
}
