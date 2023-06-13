import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from '../SidebarData/index';
import './style.css';
import { IconContext } from 'react-icons';
import { Outlet, useLocation } from 'react-router-dom';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();

  const showSidebar = () => setSidebar(!sidebar);

  const activeStyle = {
    color: '#785A9F',
  };

  const navActive = ({ isActive }) => (isActive ? activeStyle : undefined);

  return (
    <>
      <IconContext.Provider value={{ color: '#0A1A41' , fontWeight: 900}}>
        <div className='navbar'>
          <h1 className='connectify'>Connectify</h1>

          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} role='navbar'>
                  <NavLink to={item.path} style={navActive}>
                    <span role='icon'> {item.icon}</span>

                    <span>{item.title}</span>
                  </NavLink>
                  </li>
                  </div>
                );
              })}
          </ul>
        </nav>
      </IconContext.Provider>
      <Outlet />
    </>
  );
}

export default Navbar;

