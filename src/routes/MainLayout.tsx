import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const innerWidth = window.innerWidth;

function MainLayout() {
  return (
    <main
      className='layout-container'
      style={innerWidth < 555 ? { backgroundImage: `url(${getImg()})` } : {}}
    >
      <Outlet />
      <Navbar />
    </main>
  );
}

export default MainLayout;

const bgImg1 =
  'https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const bgImg2 =
  'https://images.pexels.com/photos/32319577/pexels-photo-32319577.jpeg?_gl=1*1sr579c*_ga*MTA3ODU0OTE2LjE3Mzg5MDQ2NjE.*_ga_8JE65Q40S6*czE3NTIwNzUxNjUkbzMkZzEkdDE3NTIwNzUxOTAkajM1JGwwJGgw';
const bgImg3 =
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

function getImg() {
  const storedImg = localStorage.getItem('bg-img');
  if (storedImg) return storedImg;
  const images = [bgImg1, bgImg2, bgImg3];
  const getDate = new Date().getDate();
  if (getDate % 2 === 0) return images[0];
  else if (getDate % 3 === 0) return images[1];
  else return images[2];
}
