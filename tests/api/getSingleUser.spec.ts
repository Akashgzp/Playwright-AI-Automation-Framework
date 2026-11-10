
import { test, expect } from '@playwright/test';
import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';

test.describe('GET Single User API Tests', () => {

  test('TC022 - Verify GET single user API', async ({ request }) => {

    const api = new APIHelper(request);

    const response = await api.get(
      API_ENDPOINTS.SINGLE_USER(1)
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(responseBody.name).toBeTruthy();
    expect(responseBody.username).toBeTruthy();
    expect(responseBody.email).toContain('@');

    expect(responseBody).toHaveProperty('address');
    expect(responseBody).toHaveProperty('company');

  });

});
