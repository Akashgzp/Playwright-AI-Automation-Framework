
import { test, expect } from '@playwright/test';
import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';
import { apiTestData } from '../../test-data/apiData';

test.describe('PATCH API Tests', () => {

  test('TC025 - Verify PATCH update post API', async ({ request }) => {

    const api = new APIHelper(request);

    const response = await api.patch(
      API_ENDPOINTS.SINGLE_POST(1),
      apiTestData.patchPost
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);

    expect(responseBody.title).toBe(
      apiTestData.patchPost.title
    );

  });

});
