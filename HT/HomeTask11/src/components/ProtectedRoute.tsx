import React from 'react';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAllowed: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAllowed }) => {
  const router = useRouter();

  if (!isAllowed) {
    router.replace('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;