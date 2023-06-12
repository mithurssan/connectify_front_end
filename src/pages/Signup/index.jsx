import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
	const [companyName, setCompanyName] = useState('');
	const [companyNumber, setCompanyNumber] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	async function getCompany(companyNumber) {
		try {
			const url = `http://127.0.0.1:5000/api/company/${companyNumber}`;
			const res = await axios.get(url);
			const data = res.data;

			if (data['company_name'] == companyName && data['company_number'] == companyNumber) {
				setError(false);
				setIsLoaded(true);
				console.log(data);
			} else {
				setError(true);
				setIsLoaded(false);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		getCompany(companyNumber);
	};

	const handleInputName = (e) => {
		setCompanyName(e.target.value.toUpperCase());
	};

	const handleInputNumber = (e) => {
		setCompanyNumber(e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="name">Company name: </label>
					<input type="text" id="name" value={companyName} onChange={handleInputName} />
				</fieldset>
				<fieldset>
					<label htmlFor="number">Company number: </label>
					<input type="number" id="number" value={companyNumber} onChange={handleInputNumber} />
				</fieldset>
				<input type="submit" value="Register" />
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

export default Signup;
