export const API_ROUTER = {
  USER_LIST: '/users',
  USER_DETAIL: (id: string): string => `/users/${id}`,
  TECH_LIST: '/techstacks',
  TECH_DETAIL: (id: string): string => `/techstacks/${id}`
};

export const PAGE_ROUTES = {
  HOME: '/home',
  USER_LIST: '/users',
  USER_DETAIL: (id: string): string => `/users/${id}`,
  TECH_LIST: '/techstacks',
  TECH_DETAIL: (id: string): string => `/techstacks/${id}`
};

export const NEW_ID = 'new';
export const NOT_FOUND = 'Not found';
