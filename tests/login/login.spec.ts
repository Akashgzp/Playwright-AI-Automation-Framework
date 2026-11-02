import { test, expect } from '../../fixtures/BaseFixture';

test.describe('Login Tests', () => {

  test('TC001 - Verify SauceDemo login page', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveTitle('Swag Labs');

  });

});