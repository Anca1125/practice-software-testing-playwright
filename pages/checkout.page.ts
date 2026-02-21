import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import type { GuestInfo, AddressInfo } from "../test-data/checkoutData";

export class CheckoutPage extends BasePage {
  readonly continueShopping: Locator;
  readonly proceedToCheckout: Locator;
  readonly continueAsGuestButton1: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly continueAsGuestSubmit2: Locator;
  readonly proceedToCheckout1: Locator;
  readonly yourStreetInput: Locator;
  readonly yourCityInput: Locator;
  readonly stateInput: Locator;
  readonly yourCountryInput: Locator;
  readonly yourPostCodeInput: Locator;
  readonly proceedToCheckout2: Locator;
  readonly paymentMethod: Locator;
  readonly confirmButton: Locator;
  readonly successMessage: Locator;
  readonly confirmationOrderMessage: Locator;
  readonly cartStepIndicator: Locator;
  readonly signInStepIndicator: Locator;
  readonly billingAddressStepIndicator: Locator;
  readonly paymentStepIndicator: Locator;
  readonly bTbankName: Locator;
  readonly bTaccountName: Locator;
  readonly bTaccountNumber: Locator;
  readonly creditCardNumber: Locator;
  readonly creditCardexpirationDate: Locator;
  readonly creditCardccv: Locator;
  readonly creditCardHolderName: Locator;
  readonly buyNowPayLaterChooseYourMonthlyInstallments: Locator;
  readonly giftCardNumber: Locator;
  readonly giftCardValidationCode: Locator;

  constructor(page: Page) {
    super(page);
    this.continueShopping = page.locator('[data-test="continue-shopping"]');
    this.proceedToCheckout = page.locator('[data-test="proceed-1"]');
    this.continueAsGuestButton1 = page.getByRole("tab", {
      name: "Continue as Guest",
    });
    this.emailInput = page.locator('[data-test="guest-email"]');
    this.firstNameInput = page.locator('[data-test="guest-first-name"]');
    this.lastNameInput = page.locator('[data-test="guest-last-name"]');
    this.continueAsGuestSubmit2 = page.locator('[data-test="guest-submit"]');
    this.proceedToCheckout1 = page.locator('[data-test="proceed-2-guest"]');
    this.yourStreetInput = page.locator('[data-test="street"]');
    this.yourCityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.yourCountryInput = page.locator('[data-test="country"]');
    this.yourPostCodeInput = page.locator('[data-test="postal_code"]');
    this.proceedToCheckout2 = page.locator('[data-test="proceed-3"]');
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.confirmButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('[data-test="payment-success-message"]');
    this.confirmationOrderMessage = page.locator("#order-confirmation");
    this.cartStepIndicator = page.getByText("Cart1");
    this.signInStepIndicator = page.getByText("Sign in2");
    this.billingAddressStepIndicator = page.getByText("Billing Address3");
    this.paymentStepIndicator = page.getByText("Payment4");
    this.bTbankName = page.locator('[data-test="bank_name"]');
    this.bTaccountName = page.locator('[data-test="account_name"]');
    this.bTaccountNumber = page.locator('[data-test="account_number"]');
    this.creditCardNumber = page.locator('[data-test="credit_card_number"]');
    this.creditCardexpirationDate = page.locator(
      '[data-test="expiration_date"]',
    );
    this.creditCardccv = page.locator('[data-test="cvv"]');
    this.creditCardHolderName = page.locator('[data-test="card_holder_name"]');
    this.buyNowPayLaterChooseYourMonthlyInstallments = page.locator(
      '[data-test="monthly_installments"]',
    );
    this.giftCardNumber = page.locator('[data-test="gift_card_number"]');
    this.giftCardValidationCode = page.locator('[data-test="validation_code"]');
  }

  async fillGuestInfo(data: GuestInfo) {
    await this.emailInput.fill(data.email);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
  }
  async fillAddressInfo(data: AddressInfo) {
    await this.yourStreetInput.fill(data.street);
    await this.yourCityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.yourPostCodeInput.fill(data.postalCode);
    await this.yourCountryInput.fill(data.country);
  }
  async selectPaymentMethod(value: string) {
    await this.paymentMethod.selectOption(value);
  }
  async goToPaymentStep(guestData: GuestInfo, addressData: AddressInfo) {
    await this.proceedToCheckout.click();
    await this.continueAsGuestButton1.click();

    await this.fillGuestInfo(guestData);
    await this.continueAsGuestSubmit2.click();
    await this.proceedToCheckout1.click();

    await this.fillAddressInfo(addressData);
    await this.proceedToCheckout2.click();
  }

  async completePayment(method: string, paymentData?: any) {
    await this.paymentMethod.selectOption(method);

    if (method === "bank-transfer") {
      await this.bTbankName.fill(paymentData.bankName);
      await this.bTaccountName.fill(paymentData.accountName);
      await this.bTaccountNumber.fill(paymentData.accountNumber);
    }

    if (method === "credit-card") {
      await this.creditCardNumber.fill(paymentData.creditCardNumber);
      await this.creditCardexpirationDate.fill(paymentData.expirationDate);
      await this.creditCardccv.fill(paymentData.cVV);
      await this.creditCardHolderName.fill(paymentData.holderName);
    }

    if (method === "buy-now-pay-later") {
      await this.buyNowPayLaterChooseYourMonthlyInstallments.selectOption(
        paymentData.installments,
      );
    }

    if (method === "gift-card") {
      await this.giftCardNumber.fill(paymentData.giftCardNumber);
      await this.giftCardValidationCode.fill(paymentData.validationCode);
    }
  }
}
