import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const AddUserButton = () => {
	const businessId = localStorage.getItem('business_id');
	const businessName = localStorage.getItem('business_name');
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('success');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setUsername('');
		setMessage('');
		setMessageType('success');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.patch(`http://127.0.0.1:5000/users/update/business/${username}`, {
				business_id: businessId,
				user_business_name: businessName,
			})
			.then(function (response) {
				console.log(response.data);
				setMessage('User added to business.');
				setMessageType('success');
				setTimeout(() => {
					setMessage('');
					handleClose();
				}, 700);
			})
			.catch(function (error) {
				console.error(error);
				if (error.response.status === 404) {
					setMessage('User not found.');
					setTimeout(() => {
						setMessage('');
					}, 700);
				} else {
					setMessage('An error occurred.');
				}
				setMessageType('error');
			});
		setUsername('');
	};

	return (
		<div>
			<button className="add-user-button" onClick={handleOpen}>
				Add User
			</button>
			{open && (
				<div className="dialog-container">
					<form onSubmit={handleSubmit} className="dialog-form">
						<h2 className="dialog-title">Add User to Business</h2>
						<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="dialog-input" required />
						<div className="dialog-actions">
							<button type="button" className="cancel-button" onClick={handleClose}>
								Cancel
							</button>
							<button type="submit" className="add-button">
								Add User
							</button>
						</div>
						{message && <p className={`message ${messageType === 'success' ? 'user-success' : 'user-error'}`}>{message}</p>}
					</form>
				</div>
			)}
		</div>
	);
};

export default AddUserButton;
