
import { test, expect } from '@playwright/test';
import { APIHelper } from '../../api/APIHelper';
import { API_ENDPOINTS } from '../../api/endpoints';
import { apiTestData } from '../../test-data/apiData';

test.describe('POST API Tests', () => {

  test('TC023 - Verify POST create post API', async ({ request }) => {

    const api = new APIHelper(request);

    const response = await api.post(
      API_ENDPOINTS.POSTS,
      apiTestData.newPost
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.id).toBeTruthy();

    expect(responseBody.title).toBe(
      apiTestData.newPost.title
    );

    expect(responseBody.body).toBe(
      apiTestData.newPost.body
    );

    expect(responseBody.userId).toBe(
      apiTestData.newPost.userId
    );

  });

});
