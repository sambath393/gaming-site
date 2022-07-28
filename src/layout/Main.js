import { useState, useEffect } from 'react';
import { Layout, Main, Popup } from '../components';

export const MainLayout = ({ children, loading }) => {
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
    <div className='w-full min-h-screen relative bg-black'>
      <Main.ScrollToTop scrollBtn={scrollBtn} />
      {loading && <Popup.Loading />}
      <Layout.Navbar />
      <div>{children}</div>
    </div>
  );
};
