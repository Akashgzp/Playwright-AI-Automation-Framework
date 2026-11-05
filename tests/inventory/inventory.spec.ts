import { test, expect } from '../../fixtures/BaseFixture';
import { users } from '../../test-data/users';

test.describe('Inventory Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
  });

  test('TC004 - Verify inventory page is displayed', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('TC005 - Verify total inventory products', async ({
    inventoryPage,
  }) => {
    const count = await inventoryPage.getProductCount();

    expect(count).toBe(6);
  });

});