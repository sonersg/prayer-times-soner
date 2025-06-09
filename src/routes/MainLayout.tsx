import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <main className='layout-container'>
      <Outlet />

      <Navbar />
    </main>
  );
}

export default MainLayout;
