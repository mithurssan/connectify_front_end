import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setToken, setUsername, setPassword, setIsLoaded, setError } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const LoginUser = () => {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.user.username);
	const password = useSelector((state) => state.user.password);
	const isLoaded = useSelector((state) => state.app.isLoaded);
	const error = useSelector((state) => state.app.error);

	const loginUser = async () => {
		try {
			const url = 'http://127.0.0.1:5000/users/login';
			const options = {
				user_username: username,
				user_password: password,
			};
			const res = await axios.post(url, options);

			dispatch(setToken(res.data.token));
		} catch (error) {
			console.log(error, 'error');
			if (error.response && error.response.status == 401) {
				dispatch(setIsLoaded(false));
				dispatch(setError(true));
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username.length === 0 || password.length === 0) {
			dispatch(setIsLoaded(false));
			dispatch(setError(true));
		} else {
			loginUser();
			console.log(username);
			dispatch(setIsLoaded(true));
			dispatch(setError(false));
		}
	};

	const handleInputUsername = (e) => {
		dispatch(setUsername(e.target.value));
	};

	const handleInputPassword = (e) => {
		dispatch(setPassword(e.target.value));
	};

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="user-container">
				<label htmlFor="username" className="user-label">
					Username:
				</label>
				<input type="text" id="username" value={username} onChange={handleInputUsername} className="user-text" />

				<label htmlFor="password" className="user-label">
					Password:
				</label>
				<input type="password" id="password" value={password} onChange={handleInputPassword} className="user-text" />

				<input type="submit" value="Login" className="login-register-button" />
				<div className="container">
					<Link to="/login-register" className="sign-in-business">
						Login as a Business
					</Link>
				</div>
			</form>
			{isLoaded && console.log('Correct Credentials')}
			{error && console.log('Incorrect Credentials')}

			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
		</div>
	);
};

export default LoginUser;
