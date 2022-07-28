import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export default function Loading() {
  return (
    <div className='fixed w-full h-screen top-0 left-0 z-50'>
      <div className='absolute top-0 left-0 bg-white opacity-50 w-full h-full' />
      <div className='absolute w-full h-full flex justify-center items-center'>
        <div className='animate-spin'>
          <BiLoaderAlt size={100} className='text-black' />
        </div>
      </div>
    </div>
  );
}
