import { useState, useEffect } from 'react';
import { Main } from '../components';

export const MainLayout = ({ children }) => {
  // State
  const [scrollBtn, setScrollBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setScrollBtn(true);
      } else {
        setScrollBtn(false);
      }
    });
  }, []);

  return (
    <div className='w-full relative bg-black'>
      <Main.ScrollToTop scrollBtn={scrollBtn} />
      <div>{children}</div>
    </div>
  );
};
