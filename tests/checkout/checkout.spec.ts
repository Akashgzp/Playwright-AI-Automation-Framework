import { test, expect } from '../../fixtures/BaseFixture';

import { users } from '../../test-data/users';
import { products } from '../../test-data/products';
import { checkoutData } from '../../test-data/checkoutData';

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {

    // Login
    await loginPage.navigate();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Add product
    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    // Open cart
    await inventoryPage.openCart();

    // Start checkout
    await cartPage.proceedToCheckout();

  });

  test('TC012 - Verify checkout information page', async ({
    checkoutPage,
  }) => {

    await expect(checkoutPage.checkoutTitle)
      .toHaveText('Checkout: Your Information');

    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();

  });

  test('TC013 - Verify checkout with valid customer information', async ({
    checkoutPage,
  }) => {

    const customer = checkoutData.validCustomer;

    await checkoutPage.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.checkoutTitle)
      .toHaveText('Checkout: Overview');

  });

  test('TC014 - Verify checkout with empty customer information', async ({
    checkoutPage,
  }) => {

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');

  });

  test('TC015 - Verify checkout order price details', async ({
    checkoutPage,
  }) => {

    const customer = checkoutData.validCustomer;

    await checkoutPage.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.subtotal)
      .toHaveText('Item total: $29.99');

    await expect(checkoutPage.tax)
      .toHaveText('Tax: $2.40');

    await expect(checkoutPage.total)
      .toHaveText('Total: $32.39');

  });

  test('TC016 - Verify successful order placement', async ({
    checkoutPage,
  }) => {

    const customer = checkoutData.validCustomer;

    await checkoutPage.fillCustomerInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await checkoutPage.finishOrder();

    await expect(checkoutPage.confirmationHeader)
      .toHaveText('Thank you for your order!');

    await expect(checkoutPage.confirmationMessage)
      .toContainText('Your order has been dispatched');

  });

  test('TC017 - Verify checkout with missing last name', async ({
  checkoutPage,
}) => {

  await checkoutPage.firstNameInput.fill('Akash');

  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage)
    .toContainText('Last Name is required');

});

test('TC018 - Verify checkout with missing postal code', async ({
  checkoutPage,
}) => {

  await checkoutPage.firstNameInput.fill('Akash');
  await checkoutPage.lastNameInput.fill('Kumar');

  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage)
    .toContainText('Postal Code is required');

});

test('TC019 - Verify cancel checkout functionality', async ({
  checkoutPage,
  cartPage,
}) => {

  await checkoutPage.cancelCheckout();

  // Verify user is redirected to Cart page
  await expect(cartPage.cartTitle)
    .toHaveText('Your Cart');

  // Verify product is still available in cart
  await expect(
    cartPage.getCartItem(products.backpack.name)
  ).toBeVisible();

});

});