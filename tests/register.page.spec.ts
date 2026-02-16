import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { RegisterPage } from "../pages/register.page";
import { registerData } from "../test-data/registerData";
import { generateRandomEmail } from "../utils/generateRandomEmail";

test.describe("register", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigateToRegister();
  });
  test("register - happy flow - should create account successfully", async ({
    page,
  }) => {
    const email = generateRandomEmail();

    await registerPage.registerUser({
      ...registerData,
      emailAddress: generateRandomEmail(),
    });
    await expect(page).toHaveURL(/account|login|success/i);
  });
  test("register - negative scenario-missing first name - should not create account", async ({
    page,
  }) => {
    const email = generateRandomEmail();

    await registerPage.registerUser({
      ...registerData,
      firstName: "",
      emailAddress: generateRandomEmail(),
    });
    await expect(page).not.toHaveURL(/account/);
    await expect(page.getByText(" First name is required ")).toBeVisible();
  });
  test("register - negative scenario-invalid date of birth format - should not create account", async ({
    page,
  }) => {
    const email = generateRandomEmail();

    await registerPage.registerUser({
      ...registerData,
      dob: "25.05.1990",
      emailAddress: generateRandomEmail(),
    });
    await expect(page).not.toHaveURL(/account/);
    await expect(
      page.getByText("Please enter a valid date in YYYY-MM-DD format."),
    ).toBeVisible();
  });
  test("register - negative scenario-invalid email format - should not create account", async ({
    page,
  }) => {
    await registerPage.registerUser({
      ...registerData,

      emailAddress: "email@@address",
    });
    await expect(page).not.toHaveURL(/account/);
    await expect(page.getByText("Email format is invalid")).toBeVisible();
  });
  test("register - negative scenario-invalid phone format - should not create account", async ({
    page,
  }) => {
    const email = generateRandomEmail();

    await registerPage.registerUser({
      ...registerData,

      phone: "telephone",
      emailAddress: generateRandomEmail(),
    });
    await expect(page).not.toHaveURL(/account/);
    await expect(page.getByText("Only numbers are allowed.")).toBeVisible();
  });

  test("register - password visibility toogle should work correctly", async ({
    page,
  }) => {
    await expect(registerPage.password).toHaveAttribute("type", "password");
    await registerPage.passwordToggleIcon.click();
    await expect(registerPage.password).toHaveAttribute("type", "text");
    await registerPage.passwordToggleIcon.click();
    await expect(registerPage.password).toHaveAttribute("type", "password");
  });
  test("register - password strength should be weak for simple password", async ({
    page,
  }) => {
    await registerPage.password.fill("123");
    await expect(registerPage.strengthBarFill).toHaveAttribute(
      "style",
      "width: 20%;",
    );
  });
  test("register - password strength should be excellent for complex password", async ({
    page,
  }) => {
    await registerPage.password.fill("Password123@");
    await expect(registerPage.strengthBarFill).toHaveAttribute(
      "style",
      /width:\s?100%/,
    );
  });
});
