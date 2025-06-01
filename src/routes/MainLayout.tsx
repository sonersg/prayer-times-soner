import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <main className='layout-container'>
      <Outlet />
    </main>
  );
}

export default MainLayout;
