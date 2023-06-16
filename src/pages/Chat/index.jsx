import React, { useState } from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { ChatEngine } from 'react-chat-engine';
import { useSelector } from 'react-redux';
// import 'dotenv/config';

const Chat = () => {
	const username = useSelector((state) => state.user.username);
	const password = useSelector((state) => state.user.password);

	console.log(username);
	return (
		<div style={{ height: '100vh' }}>
			<ChatEngine projectId={'7f8e7fee-521a-4f50-8d9a-9028fc529c34'} username={username} secret={password} style={{ height: '100%' }} />
		</div>
	);
};

export default Chat;
