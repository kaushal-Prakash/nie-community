import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Input, Button } from '../components/components';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        dispatch(login(currentUser));
        navigate("/");
      } else {
        const user = await authService.login(email, pass);
        if (user) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            dispatch(login(userData));
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center p-20 sm:w-screen sm:p-10'>
      <form onSubmit={handleLogin} className="w-full max-w-lg p-12 bg-transparent border-2 border-amber-50 rounded-lg shadow-md glowing-border sm:w-screen">
        <Input
          label="Your email"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="Enter Your Email"
          className="mb-4"
        />
        <Input
          label="Your password"
          type="password"
          value={pass}
          name="password"
          onChange={(e) => setPass(e.target.value)}
          id="password"
          placeholder="Enter Your Password"
          className="mb-4"
        />
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
}

export default LoginPage;
