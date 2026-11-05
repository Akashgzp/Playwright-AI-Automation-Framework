import { test, expect } from '../../fixtures/BaseFixture';
import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('Product Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
  });

  test('TC006 - Verify product details', async ({
    inventoryPage,
    productPage,
  }) => {

    await inventoryPage.openProduct(products.backpack.name);

    await expect(productPage.productName)
      .toHaveText(products.backpack.name);

    await expect(productPage.productDescription).toBeVisible();

    await expect(productPage.productPrice)
      .toHaveText(products.backpack.price);
  });

  test('TC007 - Verify add to cart from product details', async ({
  inventoryPage,
  productPage,
  cartPage,
}) => {
  await inventoryPage.openProduct(products.backpack.name);

  await productPage.addToCart();

  await expect(productPage.removeButton).toBeVisible();

  await inventoryPage.openCart();

  await expect(
    cartPage.getCartItem(products.backpack.name)
  ).toBeVisible();
});

});