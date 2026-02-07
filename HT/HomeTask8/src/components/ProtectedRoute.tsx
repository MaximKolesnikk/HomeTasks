import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAllowed: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;