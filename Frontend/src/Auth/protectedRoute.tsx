// Layouts/protectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useGetCurrentUserQuery } from '@/ApiSlice/UserApi';
export function ProtectedRoute() {

  const { data: user, isLoading , error } = useGetCurrentUserQuery();

  // User is not authenticated, redirect to login page
  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (error) return <Navigate to="/login" />;

  // User is authenticated, render the protected content
  return <Outlet />;
}