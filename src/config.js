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

export const DEFAULT_PHOTO_URL =
  'https://firebasestorage.googleapis.com/v0/b/library-management-fad9d.appspot.com/o/images%2Fdefault-avatar.png?alt=media&token=403eb707-ceb5-4dc5-b7c8-7a5a1069b1ae'
