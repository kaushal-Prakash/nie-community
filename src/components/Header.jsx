import React, { useState } from 'react';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import authService from '../appwrite/auth';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.status); // Ensure this path is correct
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleClick = () => {
        navigate("/");
    }

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate('/'); // Ensure this is called after dispatch
        } catch (error) {
            console.error("Logout Error: ", error);
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-white dark:bg-neutral-900/50 backdrop-blur-md fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl cursor-pointer flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse" onClick={handleClick}>
                    <img src={Logo} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Community</span>
                </div>
                <div className="flex items-center justify-center md:order-2">
  {
    !isLogin && location.pathname !== "/login" &&
    <button
      type="button"
      className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l 
      hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 
      dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 sm:w-full sm:mb-2"
      onClick={handleLogin}
    >
      Login
    </button>
  }
  {
    !isLogin && location.pathname !== "/signup" &&
    <button
      type="button"
      className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l 
      hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 
      dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 sm:w-full sm:mb-2"
      onClick={handleSignUp}
    >
      Sign Up
    </button>
  }
  {isLogin &&
    <button
      type="button"
      className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 
      focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 
      py-2 text-center me-2 sm:w-full sm:mb-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  }
  {isLogin && <button
    type="button"
    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    onClick={toggleMenu}
  >
    <span className="sr-only">Open main menu</span>
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
    </svg>
  </button>}
</div>

                <div className={`items-center justify-center w-full md:flex md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
                    {isLogin ?
                        <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-12 rtl:space-x-reverse md:mt-0 md:border-0 md:flex-row md:space-x-8 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                    aria-current="page"
                                >
                                    All Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-post"
                                    className={({ isActive }) =>
                                        isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    Add Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/my-posts"
                                    className={({ isActive }) =>
                                        isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    My Posts
                                </NavLink>
                            </li>
                        </ul>
                        : ""
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;
