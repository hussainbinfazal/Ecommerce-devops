import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { toast } from "react-toastify";
export const AdminProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, admin, user } = useSelector((state) => state.user);
    const hasShownToast = useRef(false);
    useEffect(() => {
        if (!isAuthenticated || !admin || !user) {
            if (!hasShownToast.current) {
                hasShownToast.current = true; // Only show toast once
                toast.error('You are not an admin');
                navigate('/'); // Redirect to the homepage or login page
            }
        } else {
            hasShownToast.current = false; // Reset if authenticated
        }
    }, [isAuthenticated, admin, user, navigate]);

    // Only render children if authenticated and is admin
    return isAuthenticated && admin ? children : null;

};