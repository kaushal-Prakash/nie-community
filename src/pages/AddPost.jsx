import React, { useState } from 'react';
import { Button, Input, PostForm, Secure } from '../components/components';
import dbService from '../appwrite/db';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddPost() {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postStatus, setPostStatus] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPostStatus = false; // Use a local variable
            setPostStatus(updatedPostStatus); // Schedule the state update
            const title = e.target.title.value;
            const content = e.target.content.value;
            const userId = userData.$id;
            const post = await dbService.createPost(title, url, content, updatedPostStatus, userId);
            if (post) {
                console.log("Post created successfully:", post);
                navigate("/");
            }
        } catch (error) {
            console.log("Add Post Error ", error);
        }
    };

    return (
        <div className='h-screen w-screen py-20 sm:py-10 flex justify-center items-center'>
            <Secure>
                <div className='w-full max-w-4xl p-8 bg-transparent shadow-md rounded-lg'>
                    <Input
                        placeholder="Add a valid source URL..."
                        label="File URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        id="file-url"
                        className='w-full mb-4'
                    />
                    <PostForm
                        inputValue={title}
                        onInputChange={(e) => setTitle(e.target.value)}
                        textBox={content}
                        onChangeTextBox={(e) => setContent(e.target.value)}
                        onSubmit={handleSubmit}
                        placeholder="Title of post"
                        btnText="Add"
                    />
                </div>
            </Secure>
        </div>
    );
}

export default AddPost;
