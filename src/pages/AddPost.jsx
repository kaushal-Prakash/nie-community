import React, { useState } from 'react';
import { Button, Input, PostForm, Secure } from '../components/components';
import dbService from '../appwrite/db';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';

function AddPost() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userData = useSelector((state) => state.auth.userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userData);
      // Add your post submission logic here
    } catch (error) {
      console.log("Add Post Error ", error);
    }
  };

  return (
    <div className='h-screen w-screen py-44'>
      <Secure>
        <Input 
          placeholder="URL" 
          label="File URL" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          id="file-url" 
          type="url" 
          className='max-w-sm'
        />
        <PostForm
          inputValue={title}
          onInputChange={(e) => setTitle(e.target.value)}
          textBox={content}
          onChangeTextBox={(e) => setContent(e.target.value)}
          onSubmit={handleSubmit}
          placeholder="Title of post"
        />
      </Secure>
    </div>
  );
}

export default AddPost;
