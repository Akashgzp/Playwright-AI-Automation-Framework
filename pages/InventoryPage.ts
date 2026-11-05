import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly shoppingCartLink: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.pageTitle = page.locator('.title');
  }

  
async getProductCount(): Promise<number> {
  await this.inventoryContainer.waitFor({
    state: 'visible',
  });

  await this.inventoryItems.first().waitFor({
    state: 'visible',
  });

  return await this.inventoryItems.count();
}


  async openProduct(productName: string): Promise<void> {
  await this.page
    .locator('.inventory_item')
    .filter({ hasText: productName })
    .locator('.inventory_item_name')
    .click();
}

  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}