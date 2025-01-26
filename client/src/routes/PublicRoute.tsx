// PublicRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/spinner';

const PublicRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <div className="relative">
      {loading && <Spinner />}
      {isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />}
    </div>
  );
};

export default PublicRoute;
