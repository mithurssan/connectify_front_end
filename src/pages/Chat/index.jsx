import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setPassword } from '../../actions';
import ChatFeed from '../../components/ChatFeed';
import './style.css';

const Chat = () => {
	getUsers();
	const username = useSelector((state) => state.user.username);
	// const password = useSelector((state) => state.user.password);
	const [password, setPassword] = useState('');

	const id = '7f8e7fee-521a-4f50-8d9a-9028fc529c34';

	useEffect(() => {
		getUsers();
	}, []);

	async function getUsers() {
		try {
			const url = 'http://127.0.0.1:5000/users/';
			const res = await axios.get(url);
			const data = await res.data;

			const user = data.find((u) => u.user_username === username);

			if (user) {
				setPassword(user.user_password);
				console.log('User password:', user.user_password);
			} else {
				console.log('User not found');
			}

			console.log('STATE: ', password);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div style={{ height: '100%' }}>
			{password && (
				<ChatEngine
					projectID={id}
					userName={username}
					userSecret={password}
					// renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
					// onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
				/>
			)}
		</div>
	);
};

export default Chat;
