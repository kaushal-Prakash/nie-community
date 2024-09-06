import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Secure = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!user && location.pathname !== "/login" && location.pathname !== "/signup") {
      navigate('/login');
    }
  }, [user, navigate, location.pathname]);

  return user ? children : null;
};

export default Secure;
