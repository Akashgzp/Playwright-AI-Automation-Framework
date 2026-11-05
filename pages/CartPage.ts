import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartTitle: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.cartTitle = page.locator('.title');

    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });

    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  getCartItem(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async removeProduct(productName: string): Promise<void> {
    const product = this.getCartItem(productName);

    await product.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}