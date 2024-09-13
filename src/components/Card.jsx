import React from 'react';
import { BiSolidEditAlt } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dbService from '../appwrite/db';
import { updatePost } from '../store/postSlice';
import { useDispatch } from 'react-redux';

function Card({ content, title, url, user,id }) {
  const userId = useSelector((state) => state.auth.userData.$id);
  const postUserId = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    
    const updatePostStore = async ()=> {
      try {
        const post = await dbService.getPost(id);
        if(post){
          dispatch(updatePost(post));
          const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
          navigate(`/edit/${formattedTitle}`);
        }
      } catch (error) {
        console.log("Document fetch error : ",error);
      }
    };
    updatePostStore();
  };

  return (
    <div className="max-w-sm max-h-fit p-6 shadow-md shadow-slate-800 cursor-pointer bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {content.length > 70 ? `${content.substring(0, 50)}...` : content}
      </p>
      <div className='flex items-center'>
        <a href={url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View
        </a>
        {(postUserId === userId) && (
          <button className='p-3' onClick={handleClick}>
            <BiSolidEditAlt size={24} color='white' />
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
