import React from 'react';
import { useSelector } from 'react-redux';
import { AddUserForm, DashboardIcons } from '../../components';
import { Link } from 'react-router-dom';
import rota_icon from '../../assets/rota-icon.png';
import messages_icon from '../../assets/messages-icon.png';
import planner_icon from '../../assets/planner-icon.png';
import bookings_icon from '../../assets/bookings-icon.png';

import "./style.css"

const Dashboard = () => {
	const username = useSelector((state) => state.user.username);
	const businessName = useSelector((state) => state.business.companyName);
	const isBusiness = localStorage.getItem("isBusiness")

	return (
		<>
			{isBusiness ? (
				<>
					<div className="welcome">
						<h1><span className="wave">👋</span>Welcome, {businessName}!</h1>
					</div>
					<AddUserForm />
				</>
			) : (
				<>
					<div className="welcome">
						<h1><span className="wave">👋</span>Welcome, {username}!</h1>
					</div>
				</>
			)}
			<div className="dashboard">
				<Link to="/rota">
					<DashboardIcons title="Rota" image={rota_icon} />
				</Link>
				<Link to="/chat">
					<DashboardIcons title="Messages" image={messages_icon} />
				</Link>
				<Link to="/wellbeing/journal" >
					<DashboardIcons title="Journal" image={planner_icon} />
				</Link>
				<Link to="/bookings">
					<DashboardIcons title="Bookings" image={bookings_icon} />
				</Link>
			</div>
		</>
	);
};

export default Dashboard;
