import React from 'react';

const Button = ({ type, text, className= "" }) => {
  return (
    <div className='flex w-full justify-center'>
      <button
        type={type}         
        className={`text-white bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
        w-full sm:w-auto px-5 py-2.5 sm:py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800 ${className} 
        md:w-auto md:px-5 md:py-2.5 md:text-sm 
        sm:w-full sm:px-4 sm:py-2 sm:text-xs`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
