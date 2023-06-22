import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeToken,
	setUsername,
	setPassword,
	setEmails,
	setVerifyToken,
	setCompanyName,
	setCompanyEmail,
	setCompanyPassword,
	setCompanyNumber,
} from '../../actions';
import { SidebarData } from '../SidebarData/index';
import LogoutIcon from '../../assets/logout_icon_151219.png';

import './style.css';

function Navbar() {
	const [sidebar, setSidebar] = useState(false);
	// const username = useSelector((state) => state.user.username);
	// const password = useSelector((state) => state.user.password);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [joinedBusiness, setJoinedBusiness] = useState(null);

	const showSidebar = () => setSidebar(!sidebar);
	const handleRemoveToken = () => {
		dispatch(removeToken());
		dispatch(setUsername(''));
		dispatch(setPassword(''));
		dispatch(setEmails(''));
		dispatch(setVerifyToken(''));
		dispatch(setCompanyName(''));
		dispatch(setCompanyEmail(''));
		dispatch(setCompanyPassword(''));
		dispatch(setCompanyNumber(''));
		localStorage.removeItem('reduxState');
	};

	const activeStyle = {
		color: '#785A9F',
	};

	const navActive = ({ isActive }) => (isActive ? activeStyle : undefined);

	const logout = async () => {
		const url = 'https://connectify-server-b31a.onrender.com/logout'; /* c8 ignore start */
		await axios.post(url);
		handleRemoveToken(removeToken());
		localStorage.clear();
		navigate('/');
	};

	useEffect(() => {
		const joinedBusinessValue = localStorage.getItem('joinedBusiness');
		setJoinedBusiness(joinedBusinessValue);
	}, []);

	const filteredSidebarData = SidebarData.filter((item) => {
		if (joinedBusiness) {
			return item.forBusiness;
		} else {
			/* c8 ignore start */
			return item.show;
		}
	});
	/* c8 ignore end */
	return (
		<>
			<IconContext.Provider
				value={{
					color: '#0A1A41',
				}}>
				<div className="navbar">
					<Link to="/dashboard" className="conn-logo">
						<h1 className="connectify">Connectify</h1>
					</Link>

					<Link to="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} role="menu" />
					</Link>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'} role="sidebar">
					<ul className="nav-menu-items" onClick={showSidebar} role="nav">
						<li className="navbar-toggle">
							<Link to="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{filteredSidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName} role="navbar">
									<NavLink to={item.path} style={navActive}>
										<span role="icon" className="icon">
											{item.icon}
										</span>

										<span>{item.title}</span>
									</NavLink>
								</li>
							);
						})}
						<div className="logout-container">
							<img src={LogoutIcon} alt="logout-icon" className="logout-icon" />
							<button data-testid="logout-button" className="logout-button" onClick={logout}>
								Logout
							</button>
						</div>
					</ul>
				</nav>
			</IconContext.Provider>
			<Outlet />
		</>
	);
}

export default Navbar;
