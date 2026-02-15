import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

type RegisterUser = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  emailAddress?: string;
  password?: string;
};

export class RegisterPage extends BasePage {
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dateOfBirth: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly emailAddress: Locator;
  readonly password: Locator;
  readonly registerButton: Locator;
  readonly passwordToggleIcon: Locator;
  readonly strengthBarFill: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByRole("link", { name: /sign in/i });
    this.createAccountLink = page.getByRole("link", { name: /register/i });
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.dateOfBirth = page.locator("#dob");
    this.street = page.locator("#street");
    this.postalCode = page.locator("#postal_code");
    this.city = page.locator("#city");
    this.state = page.locator("#state");
    this.country = page.locator("#country");
    this.phone = page.locator("#phone");
    this.emailAddress = page.locator("#email");
    this.password = page.locator("#password");
    this.registerButton = page.locator(".btnSubmit");
    this.passwordToggleIcon = page.locator(".btn-outline-secondary");
    this.strengthBarFill = page.locator(".strength-bar .fill");

    //this.passwordToggleIcon = page.locator('[data-test="password"]');
  }
  async navigateToRegister() {
    await this.page.goto("/");
    await this.signInLink.click();
    await this.createAccountLink.click();
  }

  async registerUser(data: RegisterUser) {
    if (data.firstName !== undefined) await this.firstName.fill(data.firstName);

    if (data.lastName !== undefined) await this.lastName.fill(data.lastName);

    if (data.dob !== undefined) await this.dateOfBirth.fill(data.dob);

    if (data.street !== undefined) await this.street.fill(data.street);

    if (data.postalCode !== undefined)
      await this.postalCode.fill(data.postalCode);

    if (data.city !== undefined) await this.city.fill(data.city);

    if (data.state !== undefined) await this.state.fill(data.state);

    if (data.country !== undefined)
      await this.country.selectOption({ label: data.country });

    if (data.phone !== undefined) await this.phone.fill(data.phone);

    if (data.emailAddress !== undefined)
      await this.emailAddress.fill(data.emailAddress);

    if (data.password !== undefined) await this.password.fill(data.password);

    await this.registerButton.click();
  }
}
