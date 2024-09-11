import React, { useState, useEffect } from 'react';
import Secure from '../components/Secure';
import dbService from "../appwrite/db";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dbService.getPosts();
        console.log(response);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Secure>
        
      </Secure>
    </div>
  );
}

export default AllPosts;
