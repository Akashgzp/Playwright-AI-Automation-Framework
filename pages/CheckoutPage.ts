import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;

  readonly errorMessage: Locator;
  readonly checkoutTitle: Locator;

  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly confirmationHeader: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');

    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutTitle = page.locator('.title');

    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');

    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationMessage = page.locator('.complete-text');
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}