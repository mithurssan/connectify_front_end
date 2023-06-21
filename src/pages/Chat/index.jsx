import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced';

const Chat = () => {
	const username = useSelector((state) => state.user.username);
	const companyName = useSelector((state) => state.business.companyName);
	const [secret, setSecret] = useState('');

	const id = '7f8e7fee-521a-4f50-8d9a-9028fc529c34';
	const isBusiness = localStorage.getItem('isBusiness');

	isBusiness ? getCompanies() : getUsers();

	async function getCompanies() {
		try {
			const url = 'http://127.0.0.1:5000/businesses/';
			const res = await axios.get(url);
			const data = await res.data;

			const business = data.find((b) => b.business_name === companyName);

			if (business) {
				// setPassword(business.business_password);
			} else {
				console.log('Business not found');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function getUsers() {
		try {
			const url = 'http://127.0.0.1:5000/users/';
			const res = await axios.get(url);
			const data = await res.data;

			const user = data.find((u) => u.user_username === username);

			if (user) {
				setSecret(user.user_password);
				console.log('User password:', user.user_password);
			} else {
				console.log('User not found');
			}
		} catch (error) {
			console.log(error);
		}
	}

	const chatProps = useMultiChatLogic('7f8e7fee-521a-4f50-8d9a-9028fc529c34', username, '$2b$12$81tKILcvI1titJ/CUkW8hey8/kz4sXHkGv4I5fc1mFt0KPyttwuBq');

	return (
		<>
			<MultiChatWindow {...chatProps} />
			<MultiChatSocket {...chatProps} />
		</>
	);
};

export default Chat;
