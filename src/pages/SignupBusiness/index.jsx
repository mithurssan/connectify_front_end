import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const SignupBusiness = () => {
	const [companyName, setCompanyName] = useState('');
	const [companyNumber, setCompanyNumber] = useState('');
	const [companyPassword, setCompanyPassword] = useState('');
	const [companyEmail, setCompanyEmail] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	async function getCompany(companyNumber) {
		try {
			const url = `http://127.0.0.1:5000/api/company/${companyNumber}`;
			const res = await axios.get(url);
			const data = res.data;

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
	const handleInputPassword = (e) => {
		setCompanyPassword(e.target.value);
	};
	const handleInputEmail = (e) => {
		setCompanyEmail(e.target.value);
	};

	return (
		<div className='container-login-register'>
			<form onSubmit={handleSubmit} className="business-container">
				<fieldset>
					<label htmlFor="name" className="company-label" >Company name:  </label>
					<input type="text" id="name" value={companyName} onChange={handleInputName} className='business-text' />
				</fieldset>
				<fieldset>
					<label htmlFor="number" className="company-label">Company number: </label>
					<input type="number" id="number" value={companyNumber} onChange={handleInputNumber} className='business-text' />
				</fieldset>
				<fieldset>
					<label htmlFor="email" className="company-label">Email address: </label>
					<input type="email" id="email" value={companyEmail} onChange={handleInputEmail} className='business-text' />
				</fieldset>
				<fieldset>
					<label htmlFor="password" className="company-label">Password: </label>
					<input type="password" id="password" value={companyPassword} onChange={handleInputPassword} className='business-text' />
				</fieldset>
				<input type="submit" value="Register" className='login-register-button' />
			
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
