
import { test } from '../../fixtures/BaseFixture';
import { expect } from '@playwright/test';

import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';

import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('API and UI Integration Tests', () => {

  test('TC027 - Fetch user data from API and complete SauceDemo checkout', async ({
    request,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {

    // STEP 1: Fetch user data from API
    const api = new APIHelper(request);

    const apiResponse = await api.get(
      API_ENDPOINTS.SINGLE_USER(1)
    );

    // Validate API response
    expect(apiResponse.status()).toBe(200);

    const headers = apiResponse.headers();

    expect(headers['content-type']).toContain('application/json');

    const userData = await apiResponse.json();

    expect(userData.name).toBeTruthy();
    expect(userData.address.zipcode).toBeTruthy();

    // STEP 2: Extract API data
    const nameParts = userData.name.trim().split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || 'User';
    const postalCode = userData.address.zipcode;

    // STEP 3: Login to SauceDemo
    await loginPage.navigate();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // STEP 4: Add product to cart
    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await inventoryPage.openCart();

    // STEP 5: Proceed to checkout
    await cartPage.proceedToCheckout();

    // STEP 6: Fill checkout form using API data
    await checkoutPage.fillCustomerInformation(
      firstName,
      lastName,
      postalCode
    );

    await checkoutPage.continueToOverview();

    // STEP 7: Validate checkout overview
    await expect(checkoutPage.checkoutTitle)
      .toHaveText('Checkout: Overview');

    await expect(checkoutPage.total)
      .toContainText('$32.39');

    // STEP 8: Finish order
    await checkoutPage.finishOrder();

    // STEP 9: Validate order confirmation
    await expect(checkoutPage.confirmationHeader)
      .toHaveText('Thank you for your order!');

    await expect(checkoutPage.confirmationMessage)
      .toContainText('Your order has been dispatched');

  });

});
