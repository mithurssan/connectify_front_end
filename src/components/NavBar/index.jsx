import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeToken } from '../../actions'
import { SidebarData } from '../SidebarData/index'
import './style.css'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [joinedBusiness, setJoinedBusiness] = useState(null);
  
  const showSidebar = () => setSidebar(!sidebar)
  const handleRemoveToken = () => {
    dispatch(removeToken())
  }

  const activeStyle = {
    color: '#785A9F',
  }

  const navActive = ({ isActive }) => (isActive ? activeStyle : undefined)

  const logout = async () => {
    const url = 'http://127.0.0.1:5000/logout'
    await axios.post(url)
    handleRemoveToken(removeToken())
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const joinedBusinessValue = localStorage.getItem('joinedBusiness');
    setJoinedBusiness(joinedBusinessValue);
  }, []);

  const filteredSidebarData = SidebarData.filter(item => {
    if (joinedBusiness) {
      return item.forBusiness;
    } else {
      return item.show;
    }
  });

  return (
    <>
      <IconContext.Provider
        value={{
          color: '#0A1A41',
        }}
      >
        <div className='navbar'>
          <h1 className='connectify'>Connectify</h1>

          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} role='menu' />
          </Link>
        </div>
        <nav
          className={sidebar ? 'nav-menu active' : 'nav-menu'}
          role='sidebar'
        >
          <ul className='nav-menu-items' onClick={showSidebar} role='nav'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {filteredSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} role='navbar'>
                  <NavLink to={item.path} style={navActive}>
                    <span role='icon'> {item.icon}</span>

                    <span>{item.title}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
        <button onClick={logout}>Logout</button>
      </IconContext.Provider>
      <Outlet />
    </>
  )
}

export default Navbar
