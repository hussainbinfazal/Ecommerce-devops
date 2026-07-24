import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, checking } = useSelector((state) => state.user);
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (!checking && !isAuthenticated && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error('Session expired, please log in again')
      navigate('/login');
    }
  }, [isAuthenticated, navigate, checking]);

  return isAuthenticated ? children : null;
};

