import React from 'react';
import { Logo } from './components';

function Footer() {
  return (
    <footer className="max-w-full rounded-lg shadow mt-5 backdrop-blur-md bg-transparent">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap dark:text-white">Community</span>
          </div>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-xs sm:text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="https://www.linkedin.com/in/devkaushalprakash/" className="hover:underline me-2 md:me-4">LinkedIn</a>
            </li>
            <li>
              <a href="mailto:kingkaushal1289@gmail.com" className="hover:underline">Contact me</a>
            </li>
          </ul>
        </div>
        <hr className="my-4 sm:my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">© 2024 Community™. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
