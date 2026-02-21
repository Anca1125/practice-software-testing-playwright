import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { CheckoutPage } from "../pages/checkout.page";
import { checkoutData, invalidCheckoutData } from "../test-data/checkoutData";
import type { GuestInfo, AddressInfo } from "../test-data/checkoutData";

test("checkout - guest user - baseline happy flow (cash on delivery method for payment)", async ({
  page,
}) => {
  const checkoutPage = new CheckoutPage(page);

  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="product-name"]').first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('a[href="/checkout"]').click();

  await expect(page).toHaveURL(/checkout/);

  await page.locator('[data-test="proceed-1"]').click();
  await checkoutPage.continueAsGuestButton1.click();

  await expect(page).toHaveURL("https://practicesoftwaretesting.com/checkout");
  await expect(checkoutPage.cartStepIndicator).toBeVisible();

  await checkoutPage.fillGuestInfo(checkoutData.guestInfo);
  await checkoutPage.continueAsGuestSubmit2.click();
  await checkoutPage.proceedToCheckout1.click();

  await expect(checkoutPage.signInStepIndicator).toBeVisible();

  await checkoutPage.fillAddressInfo(checkoutData.addressInfo);
  await checkoutPage.proceedToCheckout2.click();

  await expect(checkoutPage.billingAddressStepIndicator).toBeVisible();

  await checkoutPage.selectPaymentMethod("Cash on Delivery");
  await checkoutPage.confirmButton.click();

  await expect(checkoutPage.paymentStepIndicator).toBeVisible();
  await expect(checkoutPage.successMessage).toHaveText(
    "Payment was successful",
  );
  await checkoutPage.confirmButton.click();

  await expect(checkoutPage.confirmationOrderMessage).toContainText(
    "Thanks for your order!",
  );
});

test.describe("checkout - advanced payment methods", () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);

    await page.goto("https://practicesoftwaretesting.com/");
    await page.locator('[data-test="product-name"]').first().click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('a[href="/checkout"]').click();

    await expect(page).toHaveURL(/checkout/);

    await page.locator('[data-test="proceed-1"]').click();
    await checkoutPage.continueAsGuestButton1.click();

    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/checkout",
    );

    await expect(checkoutPage.cartStepIndicator).toBeVisible();

    await checkoutPage.fillGuestInfo(checkoutData.guestInfo);
    await checkoutPage.continueAsGuestSubmit2.click();
    await checkoutPage.proceedToCheckout1.click();

    await expect(checkoutPage.signInStepIndicator).toBeVisible();

    await checkoutPage.fillAddressInfo(checkoutData.addressInfo);
    await checkoutPage.proceedToCheckout2.click();

    await expect(checkoutPage.billingAddressStepIndicator).toBeVisible();
  });

  test("checkout - happy flow - bank transfer", async () => {
    await checkoutPage.selectPaymentMethod("bank-transfer");

    await checkoutPage.bTbankName.fill(
      checkoutData.paymentInfo.bankTransfer.bankName,
    );
    await checkoutPage.bTaccountName.fill(
      checkoutData.paymentInfo.bankTransfer.accountName,
    );

    await checkoutPage.bTaccountNumber.fill(
      checkoutData.paymentInfo.bankTransfer.accountNumber,
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.successMessage).toHaveText(
      "Payment was successful",
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.confirmationOrderMessage).toContainText(
      "Thanks for your order!",
    );
  });

  test("checkout - happy flow - credit card", async () => {
    await checkoutPage.completePayment(
      "credit-card",
      checkoutData.paymentInfo.creditCard,
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.successMessage).toHaveText(
      "Payment was successful",
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.confirmationOrderMessage).toContainText(
      "Thanks for your order!",
    );
  });

  test("checkout - happy flow - gift card", async () => {
    await checkoutPage.completePayment(
      "gift-card",
      checkoutData.paymentInfo.giftCard,
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.successMessage).toHaveText(
      "Payment was successful",
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.confirmationOrderMessage).toContainText(
      "Thanks for your order!",
    );
  });

  test("checkout - happy flow - buy now pay later", async () => {
    await checkoutPage.completePayment(
      "buy-now-pay-later",
      checkoutData.paymentInfo.buyNowPayLater,
    );
    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.successMessage).toHaveText(
      "Payment was successful",
    );

    await checkoutPage.confirmButton.click();

    await expect(checkoutPage.confirmationOrderMessage).toContainText(
      "Thanks for your order!",
    );
  });
});

test("checkout - negative scenario - invalid email", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="product-name"]').first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('a[href="/checkout"]').click();

  await expect(page).toHaveURL(/checkout/);

  await checkoutPage.proceedToCheckout.click();
  await checkoutPage.continueAsGuestButton1.click();
  await checkoutPage.fillGuestInfo(invalidCheckoutData.guestInfo);
  await checkoutPage.continueAsGuestSubmit2.click();

  await expect(page.getByText("Email format is invalid")).toBeVisible();
  await expect(page).toHaveURL(/checkout/);
});
test("checkout - negative scenario - address fields empty ", async ({
  page,
}) => {
  const checkoutPage = new CheckoutPage(page);

  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="product-name"]').first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('a[href="/checkout"]').click();

  await expect(page).toHaveURL(/checkout/);

  await checkoutPage.proceedToCheckout.click();
  await checkoutPage.continueAsGuestButton1.click();
  await checkoutPage.fillGuestInfo(checkoutData.guestInfo);
  await checkoutPage.continueAsGuestSubmit2.click();
  await checkoutPage.proceedToCheckout1.click();

  await checkoutPage.fillAddressInfo(invalidCheckoutData.addressInfo);

  await expect(checkoutPage.proceedToCheckout2).toBeDisabled();
});

test.describe("checkout - payment - negative scenarious", () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);

    await page.goto("https://practicesoftwaretesting.com/");
    await page.locator('[data-test="product-name"]').first().click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('a[href="/checkout"]').click();

    await checkoutPage.goToPaymentStep(
      checkoutData.guestInfo,
      checkoutData.addressInfo,
    );
  });

  test("checkout - negative scenario - invalid data for bank transfer", async ({
    page,
  }) => {
    await checkoutPage.completePayment(
      "bank-transfer",
      invalidCheckoutData.paymentInfo.bankTransfer,
    );

    await expect(
      page.getByText("Bank name can only contain letters and spaces."),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Account name can contain letters, numbers, spaces, periods, apostrophes, and hyphens.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText("Account number must be numeric."),
    ).toBeVisible();
  });

  test("checkout - negative scenario - invalid data for credit card", async ({
    page,
  }) => {
    await checkoutPage.completePayment(
      "credit-card",
      invalidCheckoutData.paymentInfo.creditCard,
    );

    await expect(page.getByText("Invalid card number format.")).toBeVisible();
    await expect(
      page.getByText("Invalid date format. Use MM/YYYY."),
    ).toBeVisible();
    await expect(page.getByText("CVV must be 3 or 4 digits.")).toBeVisible();
    await expect(checkoutPage.confirmButton).toBeDisabled();
  });

  test("checkout - negative scenario - invalid data for gift card", async ({
    page,
  }) => {
    await checkoutPage.completePayment(
      "gift-card",
      invalidCheckoutData.paymentInfo.giftCard,
    );

    await expect(
      page.getByText("Gift card number must be alphanumeric."),
    ).toBeVisible();
    await expect(
      page.getByText("Validation code must be alphanumeric."),
    ).toBeVisible();
    await expect(checkoutPage.confirmButton).toBeDisabled();
  });

  test("checkout - negative scenario - no value set for buy now pay later", async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.selectPaymentMethod("buy-now-pay-later");
    await expect(checkoutPage.confirmButton).toBeDisabled();
  });
});
