import { Page, Locator } from '@playwright/test';

export class InventoryPage {

  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryContainer = page.locator('.inventory_container');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async isInventoryPageDisplayed(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}