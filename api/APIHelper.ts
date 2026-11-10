import { APIRequestContext, APIResponse } from '@playwright/test';

export class APIHelper {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string): Promise<APIResponse> {
    return await this.request.get(
      `https://jsonplaceholder.typicode.com${endpoint}`
    );
  }

  async post(endpoint: string, data: object): Promise<APIResponse> {
    return await this.request.post(
      `https://jsonplaceholder.typicode.com${endpoint}`,
      { data }
    );
  }

  async put(endpoint: string, data: object): Promise<APIResponse> {
    return await this.request.put(
      `https://jsonplaceholder.typicode.com${endpoint}`,
      { data }
    );
  }

  async patch(endpoint: string, data: object): Promise<APIResponse> {
    return await this.request.patch(
      `https://jsonplaceholder.typicode.com${endpoint}`,
      { data }
    );
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return await this.request.delete(
      `https://jsonplaceholder.typicode.com${endpoint}`
    );
  }
}