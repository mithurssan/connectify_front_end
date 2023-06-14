import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignupBusiness = () => {
	const [companyName, setCompanyName] = useState('');
	const [companyNumber, setCompanyNumber] = useState('');
	const [companyPassword, setCompanyPassword] = useState('');
	const [companyEmail, setCompanyEmail] = useState('');
	const [data, setData] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		postCompany();
	}, [data]);

	async function getCompany(number) {
		try {
			const url = `http://127.0.0.1:5000/api/company/${number}`;
			const res = await axios.get(url);
			const data = res.data;
			setData(data);
		} catch (error) {
			console.error(error);
		}
	}

	async function postCompany() {
		try {
			if (data['company_name'] == companyName && data['company_number'] == companyNumber) {
				const res = await axios.post('http://127.0.0.1:5000/businesses/register', {
					business_name: companyName,
					business_number: companyNumber,
					business_email: companyEmail,
					business_password: companyPassword,
				});
				console.log(res);
				setError(false);
				setIsLoaded(true);
				console.log(data);
			} else {
				setIsLoaded(false);
			}
		} catch (error) {
			setError(true);
			console.error(error);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await getCompany(companyNumber);
	};

	const handleInputName = (e) => {
		setCompanyName(e.target.value.toUpperCase());
	};

	const handleInputNumber = (e) => {
		setCompanyNumber(e.target.value);
	};
	const handleInputPassword = (e) => {
		setCompanyPassword(e.target.value);
	};
	const handleInputEmail = (e) => {
		setCompanyEmail(e.target.value);
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
				<fieldset>
					<label htmlFor="email">Email address: </label>
					<input type="email" id="email" value={companyEmail} onChange={handleInputEmail} />
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password: </label>
					<input type="password" id="password" value={companyPassword} onChange={handleInputPassword} />
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

export default SignupBusiness;
