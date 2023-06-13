import React, { useState } from 'react';
import axios from 'axios';

const LoginBusiness = () => {
	const [businessName, setBusinessName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	const loginBusiness = async () => {
		try {
			const url = 'http://127.0.0.1:5000/businesses/login';
			const options = {
				business_name: businessName,
				business_password: password,
			};
			const res = await axios.post(url, options);
			console.log(res);
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

		if (businessName.length === 0) {
			setIsLoaded(false);
			setError(true);
		} else if (password.length === 0) {
			setIsLoaded(false);
			setError(true);
		} else {
			loginBusiness();

			setIsLoaded(true);
			setError(false);
		}
	};

	const handleInputBusinessName = (e) => {
		setBusinessName(e.target.value);
	};

	const handleInputPassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="username">Business name: </label>
					<input type="text" id="username" value={businessName} onChange={handleInputBusinessName} />
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password: </label>
					<input type="password" id="password" value={password} onChange={handleInputPassword} />
				</fieldset>
				<input type="submit" value="Login" />
			</form>
			{isLoaded && <h1>Correct Credentials</h1>}
			{error && (
				<div>
					<h1>Incorrect Credentials</h1>
				</div>
			)}
		</div>
	);
};

export default LoginBusiness;
