import React from 'react';
import { useSelector } from 'react-redux';
import { AddUserForm } from '../../components';
const Dashboard = () => {
	const username = useSelector((state) => state.user.username);
	const businessName = useSelector((state) => state.business.companyName);
	const isBusiness = localStorage.getItem("isBusiness")

	return (
		<>
			{isBusiness ? (
				<>
					<div>Welcome {businessName}!</div>
					<AddUserForm />
				</>
			) : (
				<div>Welcome {username}!</div>
			)}
		</>
	);
};

export default Dashboard;
