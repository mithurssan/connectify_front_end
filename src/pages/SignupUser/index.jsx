import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setVerified } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const SignupUser = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isLoaded, setIsLoaded] = useState('false');

	const errorCreate = (error) =>
		toast.error(error, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});

	async function registerUser() {
		try {
			const url = 'http://127.0.0.1:5000/users/register';
			const options = {
				user_username: username,
				user_email: email,
				user_password: password,
			};
			const res = await axios.post(url, options);

			dispatch(setVerified(false));
			dispatch(setIsLoaded(true));
		} catch (error) {
			errorCreate('LINE 44');
			console.error(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		registerUser();
	};

	const handleInputChange = (e, setValue) => {
		setValue(e.target.value);
	};

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="business-container">
				<label htmlFor="username" className="business-label">
					Username:{' '}
				</label>
				<input type="text" id="username" value={username} onChange={(e) => handleInputChange(e, setUsername)} className="business-text" />

				<label htmlFor="email" className="business-label">
					Email:{' '}
				</label>
				<input type="email" id="email" value={email} onChange={(e) => handleInputChange(e, setEmail)} className="business-text" />

				<label htmlFor="password" className="business-label">
					Password:{' '}
				</label>
				<input type="password" id="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} className="business-text" />

				<input type="submit" value="Register" className="login-register-button" />

				<div className="container">
					<Link to="/login-register" className="sign-up-business">
						Sign Up as a Business
					</Link>
				</div>
			</form>

			{/* {isLoaded && console.log('Correct Credentials')}
			{error && console.log('Incorrect Credentials')} */}
			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
			<ToastContainer />
		</div>
	);
};

export default SignupUser;

