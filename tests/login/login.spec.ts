import { test, expect } from '../../fixtures/BaseFixture';
import { users } from '../../test-data/users';

test.describe('Login Tests', () => {

  test('TC001 - Verify successful login', async ({
    loginPage,
    inventoryPage,
  }) => {

    await loginPage.navigate();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await expect(
      inventoryPage.inventoryContainer
    ).toBeVisible();

  });

  test('TC002 - Verify invalid login', async ({ loginPage }) => {

  await loginPage.navigate();

  await loginPage.login(
    'invalid_user',
    'invalid_password'
  );

  await expect(loginPage.errorMessage).toBeVisible();

});

test('TC003 - Verify locked user login', async ({ loginPage }) => {

  await loginPage.navigate();

  await loginPage.login(
    users.lockedOutUser.username,
    users.lockedOutUser.password
  );

  await expect(loginPage.errorMessage).toBeVisible();

});

});