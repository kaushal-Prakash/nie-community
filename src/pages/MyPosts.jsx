import React, { useState, useEffect } from 'react';
import Secure from '../components/Secure';
import dbService from "../appwrite/db";
import Card from '../components/Card';
import { useSelector } from 'react-redux';

function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (userData) {
          const userId = userData.$id;
          const response = await dbService.getUserPosts(userId);
          setPosts(response.documents);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [userData]); // Add userData as a dependency

  return (
    <div>
      <Secure>
        <div className='w-screen h-screen pt-36'>
          <div className='p-5 flex gap-4 items-start flex-wrap'>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  key={post.$id}
                  content={post.content}
                  title={post.title}
                  url={post.link}
                  user={post.userId}
                  id={post.$id}
                />
              ))
            ) : (
              <h1 className='h-full w-full grid place-content-center text-slate-200'>
                Let's create a post first..
              </h1>
            )}
          </div>
        </div>
      </Secure>
    </div>
  );
}

export default MyPosts;
