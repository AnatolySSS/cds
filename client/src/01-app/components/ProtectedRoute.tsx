import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = sessionStorage.getItem('accessToken')
  const location = useLocation()

  if (!accessToken) {
    // SPA-редирект на /login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
