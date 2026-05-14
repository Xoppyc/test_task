import { Navigate } from "react-router";
import type { User } from "../types";

interface ProtectedRouteProps {
  user: User | null
  children: React.ReactNode
  adminOnly?: boolean
  redirectTo?: string
}
function ProtectedRoute({
  user,
  children,
  adminOnly = false,
  redirectTo = '/books'
}: ProtectedRouteProps) {
  if (adminOnly && user?.role != 'admin') { // if page is admin only and user is not an admin
    return (<Navigate to={redirectTo} replace />); // redirect
  }
  if (!user) { // if user is not logged in
    return (<Navigate to={redirectTo} replace />); // redirect
  }
  return children;
}

export default ProtectedRoute;