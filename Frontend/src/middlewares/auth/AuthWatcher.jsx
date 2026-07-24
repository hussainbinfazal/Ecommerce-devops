import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/slices/userSlice";
import { toast } from 'react-toastify';

const AuthWatcher = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token && isAuthenticated) {
        toast.error('Session expired. Please log in again.');
        dispatch(logout());
      }
    }, 1000); // checks every second

    return () => clearInterval(interval);
  }, [isAuthenticated, dispatch]);

  return null;
};
export default AuthWatcher;