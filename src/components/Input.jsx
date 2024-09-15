import React, { useState } from 'react';

const Input = ({ label, type, value, onChange, name, id, placeholder, className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-5 flex justify-center w-full">
      <div className="flex flex-col w-full max-w-md">
        <label htmlFor={id} className="mb-2 text-sm sm:text-xs font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : type}
            value={value}
            name={name}
            onChange={onChange}
            id={id}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500 ${className}`}
            placeholder={placeholder}
            required
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? <p className=' text-slate-400 -translate-y-2'>Hide</p> : <p className=' text-slate-400 -translate-y-2'>Show</p>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
