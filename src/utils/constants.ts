export const ROUTES = {
  login: '/login',
  home: '/',
  customers: '/users',
  reviews: '/reviews',
  settings: '/settings',
  adminOrders: '/orders',
  adminMenu: '/menu',
  adminEvents: '/events',
  locations: '/locations',
  schedules: '/schedules',
};

export const QUERIES = {
  LOGIN: '/auth/login/admin',
  ME: '/auth/me',
  USERS: '/users/admin',
  LOCATIONS: '/locations/admin',
  CUISINES: '/restaurants/cuisines',
  RESTAURANTS: '/restaurants',
  RESTAURANT: '/restaurants/:id',
  ORDERS: '/orders/admin',
  EVENTS: '/events/admin',
  SCHEDULES: '/locations/approvals',
  LOCATION_APPROVE: '/locations/:id/approve',
};
