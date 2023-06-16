import React from 'react';
import { useSelector } from 'react-redux';
const Dashboard = () => {
	const username = useSelector((state) => state.user.username);
	return <div>{username}</div>;
};

export default Dashboard;
