import { test, expect } from '@playwright/test';
import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';

test.describe('GET Users API Tests', () => {

  test('TC021 - Verify GET users API', async ({ request }) => {

    const api = new APIHelper(request);

    const response = await api.get(API_ENDPOINTS.USERS);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBeTruthy();

    expect(responseBody.length).toBeGreaterThan(0);

    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('name');
    expect(responseBody[0]).toHaveProperty('email');

  });

});