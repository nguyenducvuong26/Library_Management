function path(root, sublink) {
  return `${root}${sublink}`
}

export const ROOT_DASHBOARD = '/'

export const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  auth: {
    root: path(ROOT_DASHBOARD, 'auth'),
  },
  profile: {
    root: path(ROOT_DASHBOARD, 'profile'),
    view: (id) => `${path(ROOT_DASHBOARD, 'profile')}/${id}`,
  },
  dashboard: {
    root: path(ROOT_DASHBOARD, 'dashboard'),
  },
  library: {
    root: path(ROOT_DASHBOARD, 'library'),
  },
  loans: {
    root: path(ROOT_DASHBOARD, 'loans'),
  },
  members: {
    root: path(ROOT_DASHBOARD, 'members'),
  },
  orders: {
    root: path(ROOT_DASHBOARD, 'orders'),
  },
}
