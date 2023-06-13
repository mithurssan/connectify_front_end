import React, { useState } from 'react';
import axios from 'axios';

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
		<div>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="username">Username: </label>
					<input type="text" id="username" value={username} onChange={handleInputUsername} />
				</fieldset>
				<fieldset>
					<label htmlFor="email">Email: </label>
					<input type="email" id="email" value={email} onChange={handleInputEmail} />
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password: </label>
					<input type="password" id="password" value={password} onChange={handleInputPassword} />
				</fieldset>
				<button role="button" type="submit" name="Register">
					Register
				</button>
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
		</div>
	);
};

export default SignupUser;
