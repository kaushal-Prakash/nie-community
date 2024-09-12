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
        <div className='h-screen w-screen py-44'>
            <Secure>
                <Input
                    placeholder="Add a vaid source url..."
                    label="File URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    id="file-url"
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
