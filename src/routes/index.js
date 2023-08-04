import { Suspense, lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

// layouts
import MainLayout from 'layouts'

// components
import LoadingScreen from 'components/LoadingScreen'

import { PAGES, ROLE_BY_PAGE } from 'config'

// guards
import AuthGuard from 'guards/AuthGuard'
import RoleBasedGuard from 'guards/RoleBasedGuard'

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

export default function Router() {
  return useRoutes([
    {
      path: 'login',
      element: (
        <AuthGuard>
          <Login />
        </AuthGuard>
      ),
    },
    // Profile Routes
    {
      path: 'profile/:userId',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RoleBasedGuard roles={ROLE_BY_PAGE[PAGES.Profile]} hasContent>
              <ProfilePage />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RoleBasedGuard roles={ROLE_BY_PAGE[PAGES.Dashboard]} hasContent>
              <DashboardPage />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    // Library Routes
    {
      path: 'library',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RoleBasedGuard roles={ROLE_BY_PAGE[PAGES.Library]} hasContent>
              <LibraryPage />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    // Loans Routes
    {
      path: 'loans',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RoleBasedGuard roles={ROLE_BY_PAGE[PAGES.Loans]} hasContent>
              <LoansPage />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    // Members Routes
    {
      path: 'members',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RoleBasedGuard roles={ROLE_BY_PAGE[PAGES.Members]} hasContent>
              <MembersPage />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    // Order Routes
    {
      path: 'orders',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RoleBasedGuard roles={ROLE_BY_PAGE[PAGES.Orders]} hasContent>
              <OrdersPage />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      ),
    },
    {
      path: '*',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to='/404' replace /> },
      ],
    },
    { path: '*', element: <Navigate to='/404' replace /> },
  ])
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('pages/auth')))
// MAIN
const HomePage = Loadable(lazy(() => import('pages/Home')))
const NotFound = Loadable(lazy(() => import('pages/404')))

// PAGE
const DashboardPage = Loadable(lazy(() => import('pages/dashboard')))
const LibraryPage = Loadable(lazy(() => import('pages/library')))
const LoansPage = Loadable(lazy(() => import('pages/loans')))
const MembersPage = Loadable(lazy(() => import('pages/members')))
const OrdersPage = Loadable(lazy(() => import('pages/orders')))
const ProfilePage = Loadable(lazy(() => import('pages/profile')))
