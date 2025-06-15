import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <main
      className='layout-container'
      // style={{ backgroundImage: 'url(https://picsum.photos/1480/1480)' }}
    >
      <Outlet />

      <Navbar />
    </main>
  );
}

export default MainLayout;
