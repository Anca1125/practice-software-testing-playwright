import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly productsCard: Locator;
  readonly categoriesSection: Locator;
  readonly categoryOption: Locator;
  readonly contactLink: Locator;
  readonly contactFirstName: Locator;
  readonly contactLastName: Locator;
  readonly contactEmail: Locator;
  readonly contactSubjectDropdown: Locator;
  readonly contactMessageInput: Locator;
  readonly contactAttachament: Locator;
  readonly contactSuccessMessage: Locator;
  readonly contactSendButton: Locator;
  readonly languageDropdown: Locator;
  readonly sortProducts: Locator;
  readonly productsPrices: Locator;
  readonly activeRating: Locator;
  readonly productRatings: Locator;
  readonly priceRange: Locator;
  readonly sliderHandles: Locator;
  readonly minSlider: Locator;
  readonly maxSlider: Locator;
  readonly searchProducts: Locator;
  readonly filterBycategories: Locator;
  readonly filterByBrands: Locator;
  readonly sustenabilityCheckbox: Locator;
  readonly pagination: Locator;
  readonly paginationsButtons: Locator;
  readonly activePage: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly noResultsMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.productsCard = page.locator('[data-test="product-name"]');
    this.categoriesSection = page.getByRole("button", { name: " Categories " });
    this.categoryOption = page.locator('[data-test^="category-"]');
    this.contactLink = page.getByRole("link", { name: "Contact" });
    this.contactFirstName = page.locator("#first_name");
    this.contactLastName = page.locator("#last_name");
    this.contactEmail = page.locator("#email");
    this.contactSubjectDropdown = page.locator("#subject");
    this.contactMessageInput = page.getByText("Message *");
    this.contactAttachament = page.getByLabel("Attachment");
    this.contactSendButton = page.locator('[data-test="contact-submit"]');
    this.contactSuccessMessage = page.locator(".alert-success");
    this.languageDropdown = page.locator("#language");
    this.sortProducts = page.locator('[data-test="sort"]');
    this.productsPrices = page.locator('[data-test="product-price"]');
    this.sortProducts = page.locator('[data-test="sort"]');
    this.activeRating = page.locator(".co2-letter.active");
    this.productRatings = page.locator(".co2-letter.active");
    this.priceRange = page.locator(".ngx-slider");
    this.sliderHandles = page.locator(".ngx-slider-pointer");
    this.minSlider = page.locator(".ngx-slider-pointer-min");
    this.maxSlider = page.locator(".ngx-slider-pointer-max");
    this.searchProducts = page.locator("#search-query");
    this.filterBycategories = page.locator(".icheck");
    this.filterByBrands = page.getByRole("checkbox", { name: "brand_id" });
    this.sustenabilityCheckbox = page.locator(
      '[data-test="eco-friendly-filter"]',
    );
    this.pagination = page.locator("ul.pagination");
    this.paginationsButtons = this.pagination.locator(".page-link");
    this.activePage = this.pagination.locator(".page-item.active .page-link");
    this.nextButton = this.pagination.getByLabel(/next/i);
    this.previousButton = this.pagination.getByLabel(/previous/i);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.noResultsMessage = page.locator('[data-test="search_completed"]');
  }

  async navigateToHome() {
    await this.navigate("/");
  }
  async selectCategories(categoryName: string) {
    await this.categoriesSection.click();
    await this.page.getByRole("link", { name: categoryName }).click();
  }
  async openContactPage() {
    await this.contactLink.click();
  }
  async fillContactForm(
    firstname: string,
    lastname: string,
    email: string,
    subject: string,
    message: string,
  ) {
    await this.contactFirstName.fill(firstname);
    await this.contactLastName.fill(lastname);
    await this.contactEmail.fill(email);
    await this.contactSubjectDropdown.selectOption({ label: subject });
    await this.contactMessageInput.fill(message);
  }
  async submitContactForm() {
    await this.contactSendButton.click();
  }
  async selectLanguage(language: string) {
    await this.languageDropdown.click();
    const option = await this.page
      .locator("#dropdown-animated")
      .getByText(language);
    await option.click();
  }
  async sortBy(option: string) {
    await this.sortProducts.selectOption({ label: option });
  }
  async moveSlider(minOffset: number, maxOffset: number) {
    const minHandle = this.sliderHandles.nth(0);
    const maxHandle = this.sliderHandles.nth(1);

    const minBox = await minHandle.boundingBox();
    const maxBox = await maxHandle.boundingBox();

    if (minBox && maxBox) {
      await this.page.mouse.move(
        minBox.x + minBox.width / 2,
        minBox.y + minBox.width / 2,
      );
      await this.page.mouse.down();
      await this.page.mouse.move(minBox.x + minOffset, minBox.y);
      await this.page.mouse.up();

      await this.page.mouse.move(
        maxBox.x + maxBox.width / 2,
        maxBox.y + maxBox.width / 2,
      );
      await this.page.mouse.down();
      await this.page.mouse.move(maxBox.x + maxOffset, maxBox.y);
      await this.page.mouse.up();
    }
  }

  async filterCategory(productCategory: string) {
    await this.page.getByRole("checkbox", { name: productCategory }).check();
  }
  async filterBrand(brandName: string) {
    await this.page.getByRole("checkbox", { name: brandName }).check();
  }
  async filterSustenability(sustenability: string) {
    await this.sustenabilityCheckbox.check();
  }
  getPageButton(pageNumber: number) {
    return this.pagination.getByRole("button", { name: `Page-${pageNumber}` });
  }
  async searchProduct(value: string) {
    await this.searchInput.fill(value);
    await this.searchButton.click();
  }
}
