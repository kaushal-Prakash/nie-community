import React from 'react';
import Button from './Button';

function PostForm({ placeholder, className = "", onSubmit, inputValue, onInputChange, textBox, onChangeTextBox, btnText }) {
  return (
    <div>
      <form className="max-w-sm sm:max-w-screen mx-auto p-4 sm:p-2" onSubmit={onSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 dark:text-white">Title</label>
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            name='title'
            id="title"
            className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:p-2 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${className}`}
            placeholder={placeholder}
            required
          />
        </div>
        <label htmlFor="content" className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 dark:text-white">Details</label>
        <textarea
          id="content"
          value={textBox || ""}
          onChange={onChangeTextBox}
          name='content'
          rows="10"
          className="block p-2.5 sm:p-2 w-full text-sm sm:text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
          focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
          dark:focus:border-blue-500"
          placeholder="Write about the post..."
        ></textarea>

        <Button type="submit" text={btnText} className='mt-6 sm:mt-4' />
      </form>
    </div>
  );
}

export default PostForm;
