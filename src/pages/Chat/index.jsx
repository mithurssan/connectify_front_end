import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced';
import { setPassword, setCompanyPassword } from '../../actions';
import './style.css';

const Chat = () => {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.user.username);
	const companyName = useSelector((state) => state.business.companyName);
	const secretUser = useSelector((state) => state.user.password);
	const secretBusiness = useSelector((state) => state.business.companyPassword);

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
				dispatch(setCompanyPassword(business.business_password));
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
				dispatch(setPassword(user.user_password));
				console.log('User password:', user.user_password);
			} else {
				console.log('User not found');
			}
		} catch (error) {
			console.log(error);
		}
	}

	const chatProps = useMultiChatLogic('7f8e7fee-521a-4f50-8d9a-9028fc529c34', isBusiness ? companyName : username, isBusiness ? secretBusiness : secretUser);

	return (
		<div className="chat-eng">
			<MultiChatWindow {...chatProps} />
			<MultiChatSocket {...chatProps} />
		</div>
	);
};

export default Chat;
