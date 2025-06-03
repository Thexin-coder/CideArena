import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }

  if (user?.role !== 'admin' && user?.role !== 'owner') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;