// src/components/auth/AuthProvider.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../redux/slices/userSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, checking } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(checkAuth()).unwrap();
  }, [dispatch]);

 
  

  return children;
};

export default AuthProvider;
