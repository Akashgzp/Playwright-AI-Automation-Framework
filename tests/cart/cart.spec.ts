import { test, expect } from '../../fixtures/BaseFixture';
import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ loginPage, inventoryPage }) => {

    await loginPage.navigate();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await inventoryPage.addProductToCart(products.backpack.name);

    await inventoryPage.openCart();
  });

  test('TC008 - Verify product is displayed in cart', async ({
    cartPage,
  }) => {

    await expect(
      cartPage.getCartItem(products.backpack.name)
    ).toBeVisible();

    expect(await cartPage.getCartItemCount()).toBe(1);

  });

  test('TC009 - Verify product removal from cart', async ({
    cartPage,
  }) => {

    await cartPage.removeProduct(products.backpack.name);

    expect(await cartPage.getCartItemCount()).toBe(0);

  });

  test('TC010 - Verify continue shopping button', async ({
    cartPage,
    inventoryPage,
  }) => {

    await cartPage.continueShopping();

    await expect(inventoryPage.inventoryContainer).toBeVisible();

  });

});