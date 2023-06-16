import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const SignupUser = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	async function registerUser() {
		try {
			const url = 'http://127.0.0.1:5000/users/register';
			const options = { user_username: username, user_email: email, user_password: password };
			const res = await axios.post(url, options);

			const data = res.data;

			if (res.status === 200) {
				setError(false);
				setIsLoaded(true);
				await axios.post('http://127.0.0.1:5000/verify-email', { user_email: email, token: data.token }); /* c8 ignore next 3 */
			} else {
				setError(true);
				setIsLoaded(false);
			}

			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		registerUser();
	};

	const handleInputUsername = (e) => {
		setUsername(e.target.value);
	};

	const handleInputEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleInputPassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="business-container">
				<label htmlFor="username" className="business-label">
					Username:{' '}
				</label>
				<input type="text" id="username" value={username} onChange={handleInputUsername} className="business-text" />

				<label htmlFor="email" className="business-label">
					Email:{' '}
				</label>
				<input type="email" id="email" value={email} onChange={handleInputEmail} className="business-text" />

				<label htmlFor="password" className="business-label">
					Password:{' '}
				</label>
				<input type="password" id="password" value={password} onChange={handleInputPassword} className="business-text" />

				<input type="submit" value="Register" className="login-register-button" />

				<div className="container">
					<Link to="/login-register" className="sign-up-business">
						Sign Up as a Business
					</Link>
				</div>
		
        <input
          type='submit'
          value='Register'
          className='login-register-button'
        />
      </form>

			{isLoaded && (
				<h1 role="heading" name="Correct Credentials">
					Correct Credentials
				</h1>
			)}
			{error && (
				<div>
					<h1 role="heading" name="Incorrect Credentials">
						Incorrect Credentials
					</h1>
				</div>
			)}
			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
		</div>
	);
};

export default SignupUser;
