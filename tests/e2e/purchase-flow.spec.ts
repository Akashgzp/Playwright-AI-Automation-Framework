import { test, expect } from '../../fixtures/BaseFixture';
import { users } from '../../test-data/users';
import { products } from '../../test-data/products';
import { checkoutData } from '../../test-data/checkoutData';

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

  test('TC020 - Verify complete end-to-end purchase journey', async ({
  loginPage,
  inventoryPage,
  productPage,
  cartPage,
  checkoutPage,
}) => {

  // Step 1: Login
  await loginPage.navigate();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  // Step 2: Verify inventory
  await expect(inventoryPage.inventoryContainer).toBeVisible();

  // Step 3: Select product
  await inventoryPage.openProduct(products.backpack.name);

  // Step 4: Verify product details
  await expect(productPage.productName)
    .toHaveText(products.backpack.name);

  // Step 5: Add to cart
  await productPage.addToCart();

  // Step 6: Open cart
  await inventoryPage.openCart();

  // Step 7: Verify cart
  await expect(
    cartPage.getCartItem(products.backpack.name)
  ).toBeVisible();

  // Step 8: Start checkout
  await cartPage.proceedToCheckout();

  // Step 9: Enter customer information
  const customer = checkoutData.validCustomer;

  await checkoutPage.fillCustomerInformation(
    customer.firstName,
    customer.lastName,
    customer.postalCode
  );

  // Step 10: Continue
  await checkoutPage.continueToOverview();

  // Step 11: Verify order total
  await expect(checkoutPage.total)
    .toHaveText('Total: $32.39');

  // Step 12: Finish order
  await checkoutPage.finishOrder();

  // Step 13: Verify order confirmation
  await expect(checkoutPage.confirmationHeader)
    .toHaveText('Thank you for your order!');

});

});