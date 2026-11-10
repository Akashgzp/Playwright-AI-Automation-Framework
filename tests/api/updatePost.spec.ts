
import { test, expect } from '@playwright/test';
import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';
import { apiTestData } from '../../test-data/apiData';

test.describe('PUT API Tests', () => {

  test('TC024 - Verify PUT update post API', async ({ request }) => {

    const api = new APIHelper(request);

    const response = await api.put(
      API_ENDPOINTS.SINGLE_POST(1),
      apiTestData.updatePost
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);

    expect(responseBody.title).toBe(
      apiTestData.updatePost.title
    );

    expect(responseBody.body).toBe(
      apiTestData.updatePost.body
    );

    expect(responseBody.userId).toBe(1);

  });

});
