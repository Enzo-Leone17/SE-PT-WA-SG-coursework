import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

//ensures that the user is logged in, else redirects to the login page
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useAuth();
  console.log(authContext?.isAuthenticated);
  console.log(authContext?.user);
  return authContext?.isAuthenticated ? children : <Navigate to="/login" replace/>;
}