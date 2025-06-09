import { NavLink } from 'react-router';

function Navbar() {
  return (
    <div className='navigation-bar'>
      <div>
        <NavLink
          to='/'
          className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
        >
          <img
            src='../../public/icon-192x192.png'
            alt='logo'
            width={44}
            height={44}
          />
        </NavLink>
      </div>

      <div>
        <NavLink
          to='/settings'
          className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
        >
          <span>🍎</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
