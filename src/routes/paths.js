function path(root, sublink) {
  return `${root}${sublink}`
}

export const ROOTS_DASHBOARD = '/'

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  auth: {
    root: path(ROOTS_DASHBOARD, 'auth'),
  },
  dashboard: {
    root: path(ROOTS_DASHBOARD, 'dashboard'),
  },
  library: {
    root: path(ROOTS_DASHBOARD, 'library'),
  },
  loans: {
    root: path(ROOTS_DASHBOARD, 'loans'),
  },
  members: {
    root: path(ROOTS_DASHBOARD, 'members'),
  },
  orders: {
    root: path(ROOTS_DASHBOARD, 'orders'),
  },
}
