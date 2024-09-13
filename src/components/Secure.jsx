import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Secure = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.status);

  useEffect(() => {
    if(user){
      navigate(location.pathname);
    }else{
      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        navigate('/');
      }
    }
  }, [user, navigate, location.pathname]);

  return user ? children : null;
};

export default Secure;
