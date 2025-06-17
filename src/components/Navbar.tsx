import { NavLink } from 'react-router';
import logo from '../assets/icon-192x192.png';

function Navbar() {
  return (
    <div className='navigation-bar'>
      <NavLink
        to='/'
        className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
      >
        <img src={logo} alt='logo' width={33} height={33} />
      </NavLink>

      <NavLink
        to='/apple'
        className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
      >
        <span>🍎</span>
      </NavLink>

      <NavLink
        to='/settings'
        className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
      >
        <span>✨</span>
      </NavLink>
    </div>
  );
}

export default Navbar;
