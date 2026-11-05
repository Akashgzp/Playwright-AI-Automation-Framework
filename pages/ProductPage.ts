import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');

    this.addToCartButton = page
  .locator('.inventory_details')
  .getByRole('button', { name: 'Add to cart' });

    this.removeButton = page.getByRole('button', {
      name: 'Remove',
    });

    this.backToProductsButton = page.getByRole('button', {
      name: 'Back to products',
    });
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }

 async addToCart(): Promise<void> {
  await this.addToCartButton.waitFor({ state: 'visible' });
  await this.addToCartButton.click();
}

  async removeFromCart(): Promise<void> {
    await this.removeButton.waitFor({ state: 'visible' });
    await this.removeButton.click();
  }

  async goBackToProducts(): Promise<void> {
    await this.backToProductsButton.waitFor({ state: 'visible' });
    await this.backToProductsButton.click();
  }
}