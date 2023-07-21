export const ROLE = {
  ADMIN: 'Admin',
  MEMBER: 'Member',
}

export const PAGES = {
  Dashboard: 'Dashboard',
  Library: 'Library',
  Loans: 'Loans',
  Members: 'Members',
  Orders: 'Orders',
}

export const PAGE_PERMISSION = [
  {
    pageNames: [PAGES.Library, PAGES.Loans, PAGES.Orders],
    roles: [ROLE.ADMIN, ROLE.MEMBER],
  },
  {
    pageNames: [PAGES.Dashboard, PAGES.Members],
    roles: [ROLE.ADMIN],
  },
]

export const ROLE_BY_PAGE = PAGE_PERMISSION.reduce((prev, acc) => {
  const { pageNames = [], roles } = acc

  return {
    ...prev,
    ...pageNames.reduce(
      (subPrev, subAcc) => ({
        ...subPrev,
        [subAcc]: roles,
      }),
      {}
    ),
  }
}, {})
