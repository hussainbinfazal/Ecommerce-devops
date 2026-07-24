// src/components/auth/PublicRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, checking } = useSelector((state) => state.user);
  const location = useLocation();

  if (checking) {
    return null;
  }

  if (isAuthenticated) {
    // Redirect to the page user came from or home
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return children;
};

export default PublicRoutes;
