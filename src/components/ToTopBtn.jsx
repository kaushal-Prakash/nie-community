import React, { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa6";

function ToTopBtn() {
  const [scrolly, setScrolly] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolly(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrolly === 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [scrolly]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {show && (
        <div
          className='fixed bottom-24 right-24 rounded-full cursor-pointer bg-slate-600 p-4 hover:opacity-75 active:ring-2 active:ring-blue-500'
          onClick={handleClick}
        >
          <FaArrowUp 
            color='white'
            title='Top screen'
            size="1.25rem"
          />
        </div>
      )}
    </>
  );
}

export default ToTopBtn;
