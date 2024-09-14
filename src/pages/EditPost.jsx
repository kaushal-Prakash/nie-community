import React, { useState } from 'react';
import { PostForm, Secure, Input } from '../components/components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dbService from '../appwrite/db';

function EditPost() {
    const navigate = useNavigate();
    const post = useSelector((state) => state.post.post);
    const [url, setUrl] = useState(post.link);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [postStatus, setPostStatus] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPostStatus = false; // Use a local variable
            setPostStatus(updatedPostStatus); // Schedule the state update
            const newTitle = e.target.title.value;
            const newContent = e.target.content.value;
            const updatedPost = await dbService.updatePost(post.$id, newTitle, url, newContent, updatedPostStatus);
            if (updatedPost) {
                navigate("/");
            }
        } catch (error) {
            console.log("Update Post Error ", error);
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
                        btnText="Update"
                    />
                </div>
            </Secure>
        </div>
    );
}

export default EditPost;
