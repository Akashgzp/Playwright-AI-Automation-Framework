import { test, expect } from '../../fixtures/BaseFixture';
import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('E-Commerce E2E Tests', () => {

  test('TC011 - Verify complete product selection and cart flow', async ({
    loginPage,
    inventoryPage,
    productPage,
    cartPage,
  }) => {

    // Step 1: Navigate to application
    await loginPage.navigate();

    // Step 2: Login
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Step 3: Verify inventory
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Step 4: Open product
    await inventoryPage.openProduct(products.backpack.name);

    // Step 5: Verify product details
    await expect(productPage.productName)
      .toHaveText(products.backpack.name);

    await expect(productPage.productPrice)
      .toHaveText(products.backpack.price);

    // Step 6: Add product to cart
    await productPage.addToCart();

    // Step 7: Open cart
    await inventoryPage.openCart();

    // Step 8: Verify cart product
    await expect(
      cartPage.getCartItem(products.backpack.name)
    ).toBeVisible();

    // Step 9: Verify cart count
    expect(await cartPage.getCartItemCount()).toBe(1);

  });

});