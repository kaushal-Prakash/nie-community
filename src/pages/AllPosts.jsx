import React, { useState, useEffect, useRef } from 'react';
import Secure from '../components/Secure';
import dbService from "../appwrite/db";
import Card from '../components/Card';
import ToTopBtn from '../components/ToTopBtn';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dbService.getPosts({ limit: 30 });
        const documents = response.documents || [];
        setPosts(documents);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const fetchMorePosts = async () => {
    try {
      const response = await dbService.getPosts({ limit: 30, offset: posts.length });
      const documents = response.documents || [];
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts, ...documents];
        // Remove duplicates
        const uniquePosts = Array.from(new Set(newPosts.map(post => post.$id)))
          .map(id => newPosts.find(post => post.$id === id));
        return uniquePosts;
      });
      if (documents.length === 0) {
        setHasMore(false);
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
        <div className='w-full h-screen pt-24 sm:pt-36 overflow-y-scroll no-scrollbar'>
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
              <h1 className='h-full w-full grid place-content-center text-center text-slate-200'>
                Loading...
              </h1>
            )}
          </div>
          <ToTopBtn />
        </div>
      </Secure>
    </div>
  );
}

export default AllPosts;
