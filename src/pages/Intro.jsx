import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import homeImg from '../assets/home.png';
import homeImgSmall from '../assets/home-phone.png'; 
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';

function Intro() {
  const isLogin = useSelector((state) => state.auth.status);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return (
    <>
      {
        !isLogin && location.pathname === "/" && (
          <picture>
            <source srcSet={homeImgSmall} media="(max-width: 640px)" />
            <source srcSet={homeImg} media="(min-width: 641px)" />
            <img 
              src={homeImg} 
              className='h-screen w-screen object-cover' 
              alt="Home"
            />
          </picture>
        )
      }
    </>
  );
}

export default Intro;
