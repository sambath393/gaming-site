import React from 'react';
import { BiUpArrow } from 'react-icons/bi';

export default function ScrollToTop({ scrollBtn }) {
  return (
    scrollBtn && (
      <button
        type='button'
        className='fixed z-40 bottom-10 right-10 flex justify-center items-center w-10 h-10 bg-white rounded-lg drop-shadow-lg'
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }
      >
        <BiUpArrow />
      </button>
    )
  );
}
