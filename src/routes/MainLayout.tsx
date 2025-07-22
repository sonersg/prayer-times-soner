import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { useEffect, useRef } from 'react';

const innerWidth = window.innerWidth;
const ROUTES = ['/', '/apple', '/settings'];
const THRESHOLD = 55; // Minimum swipe distance in pixels
let currentIteration = 0;

// Standalone navigation function (no hooks)
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

function MainLayout() {
  const mainRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // console.log('MainLayout.tsx is called', window.location.pathname);

  useEffect(() => {
    const cp = localStorage.getItem('color-primary');
    if (cp) document.documentElement.style.setProperty('--color-primary', cp);
  }, []);

  useEffect(() => {
    const element = mainRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      mainRef.current?.classList.add('blur');
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      mainRef.current?.classList.remove('blur');
      touchEndX.current = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleMouseDown = (e: MouseEvent) => {
      mainRef.current?.classList.add('blur');
      touchStartX.current = e.clientX;
    };
    const handleMouseUp = (e: MouseEvent) => {
      mainRef.current?.classList.remove('blur');
      touchEndX.current = e.clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const difference = touchStartX.current - touchEndX.current;
      if (Math.abs(difference) < THRESHOLD) return;
      difference > 0 ? onSwipeLeft?.() : onSwipeRight?.();
    };

    function onSwipeLeft() {
      currentIteration++;
      if (currentIteration > ROUTES.length - 1) currentIteration = 0;
      navigate(ROUTES[currentIteration]);
      // console.log('leftttttt', currentIteration);
    }
    function onSwipeRight() {
      currentIteration--;
      if (currentIteration < 0) currentIteration = ROUTES.length - 1;
      navigate(ROUTES[currentIteration]);
      // console.log('rightttt', currentIteration);
    }

    // Touch events
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    // Mouse events for desktop
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    // Cleanup function
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
  // const images = [bgImg1, bgImg2, bgImg3];
  const getDate = new Date().getDate();
  if (getDate % 2 === 0) return bgImg1;
  else if (getDate % 3 === 0) return bgImg2;
  else return bgImg3;
}
