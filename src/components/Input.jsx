import React from 'react';

const Input = ({ label, type, value, onChange, name, id, placeholder, className = "" }) => {
  return (
    <div className="mb-5 flex justify-center">
      <div className="flex flex-col w-full max-w-md sm:max-w-full">
        <label htmlFor={id} className="mb-2 text-sm sm:text-xs font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:p-2 dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
          dark:focus:border-blue-500 ${className}`}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default Input;
