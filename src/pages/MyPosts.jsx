import React, { useState, useEffect, useRef } from 'react';
import Secure from '../components/Secure';
import dbService from "../appwrite/db";
import Card from '../components/Card';
import { useSelector } from 'react-redux';

function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (userData) {
          const userId = userData.$id;
          const response = await dbService.getUserPosts(userId, { limit: 30 });
          const documents = response.documents || []; // Provide a fallback value
          setPosts(documents);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData]);

  const fetchMorePosts = async () => {
    try {
      if (userData) {
        const userId = userData.$id;
        const response = await dbService.getUserPosts(userId, { limit: 30, offset: posts.length });
        const documents = response.documents || []; // Provide a fallback value
        setPosts((prevPosts) => [...prevPosts, ...documents]);
        if (documents.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log("Error fetching more posts:", error);
    }
  };

  const lastPostElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMorePosts();
      }
    });

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div>
      <Secure>
        <div className='w-screen h-screen pt-24 sm:pt-36 overflow-y-scroll no-scrollbar'>
          <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => {
                if (posts.length === index + 1) {
                  return (
                    <div ref={lastPostElementRef} key={post.$id}>
                      <Card
                        content={post.content}
                        title={post.title}
                        url={post.link}
                        user={post.userId}
                        id={post.$id}
                      />
                    </div>
                  );
                } else {
                  return (
                    <Card
                      key={post.$id}
                      content={post.content}
                      title={post.title}
                      url={post.link}
                      user={post.userId}
                      id={post.$id}
                    />
                  );
                }
              })
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
