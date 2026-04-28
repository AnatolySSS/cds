import { Navigate, createBrowserRouter } from 'react-router-dom'

// Layout
import { AppLayout } from './layouts/AppLayout'

// Страницы
import { DashboardPage } from '@/02-pages/dashboard-page'
import { LoginPage } from '@/02-pages/login-page'
import { CourtsPage } from '@/02-pages/courts-page'
import { UploadPage } from '@/02-pages/upload-page'
import { EmployeesPage } from '@/02-pages/employees-page'
import { UsersPage } from '@/02-pages/users-page'
import { ProtectedRoute } from './components/ProtectedRoute'
import { FinancialOrganizationsPage } from '../02-pages/financial-organizations-page'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
        handle: { title: 'Аналитика' },
      },
      {
        path: '/courts',
        element: <CourtsPage />,
        handle: { title: 'Суды' },
      },
      {
        path: '/financial-organizations',
        element: <FinancialOrganizationsPage />,
        handle: { title: 'Финансовые организации' },
      },
      {
        path: '/upload',
        element: <UploadPage />,
        handle: { title: 'Загрузка' },
      },
      {
        path: '/users',
        element: <UsersPage />,
        handle: { title: 'Пользователи' },
      },
      {
        path: '/employees',
        element: <EmployeesPage />,
        handle: { title: 'Сотрудники' },
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
