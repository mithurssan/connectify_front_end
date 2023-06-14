import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const LoginUser = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	const loginUser = async () => {
		try {
			const url = 'http://127.0.0.1:5000/users/login';
			const options = {
				user_username: username,
				user_password: password,
			};
			await axios.post(url, options);
		} catch (error) {
			console.log(error, 'error');
			if (error.response.status == 401) {
				setIsLoaded(false);
				setError(true);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username.length === 0) {
			setIsLoaded(false);
			setError(true);
		} else if (password.length === 0) {
			setIsLoaded(false);
			setError(true);
		} else {
			loginUser();

			setIsLoaded(true);
			setError(false);
		}
	};

	const handleInputUsername = (e) => {
		setUsername(e.target.value);
	};

	const handleInputPassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="user-container">
				<label htmlFor="username" className="user-label">
					Username:{' '}
				</label>
				<input type="text" id="username" value={username} onChange={handleInputUsername} className="user-text" />

				<label htmlFor="password" className="user-label">
					Password:{' '}
				</label>
				<input type="password" id="password" value={password} onChange={handleInputPassword} className="user-text" />

				<input type="submit" value="Login" className="login-register-button" />
				<div className="container">
					<Link to="/login-register" className="sign-in-business">
						SignIn as a Business
					</Link>
				</div>
			</form>
			{isLoaded && <h1>Correct Credentials</h1>}
			{error && (
				<div>
					<h1>Incorrect Credentials</h1>
				</div>
			)}

			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
		</div>
	);
};

export default LoginUser;
