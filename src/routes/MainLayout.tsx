import { Outlet, useNavigate, useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import { useEffect, useRef } from 'react';

const innerWidth = window.innerWidth;
const routes = ['/', '/apple', '/settings'];
const threshold = 55; // Minimum swipe distance in pixels
let currentIteration = 0;

function MainLayout() {
  const mainRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log('MainLayout.tsx is called');

  useEffect(() => {
    const cp = localStorage.getItem('color-primary');
    if (cp) document.documentElement.style.setProperty('--color-primary', cp);
  }, []);

  useEffect(() => {
    const element = mainRef.current;
    if (!element) return;

    currentIteration = routes.indexOf(location.pathname);

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      handleSwipe();
    };

    function onSwipeLeft() {
      currentIteration++;
      if (currentIteration > routes.length - 1) currentIteration = 0;
      navigate(routes[currentIteration]);
      // console.log('leftttttt', currentIteration);
    }
    function onSwipeRight() {
      currentIteration--;
      if (currentIteration < 0) currentIteration = routes.length - 1;
      navigate(routes[currentIteration]);
      // console.log('rightttt', currentIteration);
    }

    const handleSwipe = () => {
      const difference = touchStartX.current - touchEndX.current;
      if (Math.abs(difference) < threshold) return;
      difference > 0 ? onSwipeLeft?.() : onSwipeRight?.();
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Cleanup function
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [location.pathname]);

  return (
    <main
      ref={mainRef}
      className='layout-container'
      style={innerWidth < 555 ? { backgroundImage: `url(${getImg()})` } : {}}
    >
      <Outlet />
      <Navbar />
    </main>
  );
}

export default MainLayout;

function getImg() {
  const storedImg = localStorage.getItem('bg-img');
  if (storedImg) return storedImg;
  const bgImg1 =
    'https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  const bgImg2 =
    'https://images.pexels.com/photos/32319577/pexels-photo-32319577.jpeg?_gl=1*1sr579c*_ga*MTA3ODU0OTE2LjE3Mzg5MDQ2NjE.*_ga_8JE65Q40S6*czE3NTIwNzUxNjUkbzMkZzEkdDE3NTIwNzUxOTAkajM1JGwwJGgw';
  const bgImg3 =
    'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  const images = [bgImg1, bgImg2, bgImg3];
  const getDate = new Date().getDate();
  if (getDate % 2 === 0) return images[0];
  else if (getDate % 3 === 0) return images[1];
  else return images[2];
}
