
import { test, expect } from '@playwright/test';
import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';

test.describe('DELETE API Tests', () => {

  test('TC026 - Verify DELETE post API', async ({ request }) => {

    const api = new APIHelper(request);

    const response = await api.delete(
      API_ENDPOINTS.SINGLE_POST(1)
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toEqual({});

  });

});
