import React, { useState, useEffect } from 'react';
import Secure from '../components/Secure';
import dbService from "../appwrite/db";
import Card from '../components/Card';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dbService.getPosts();
        setPosts(response.documents);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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
                />
              ))
            ) : (
              <h1 className='h-full w-full grid place-content-center text-slate-200'>
                Loading...
              </h1>
            )}
          </div>
        </div>
      </Secure>
    </div>
  );
}

export default AllPosts;
