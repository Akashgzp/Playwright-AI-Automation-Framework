export const API_ENDPOINTS = {
  USERS: '/users',
  SINGLE_USER: (id: number) => `/users/${id}`,
  POSTS: '/posts',
  SINGLE_POST: (id: number) => `/posts/${id}`,
};