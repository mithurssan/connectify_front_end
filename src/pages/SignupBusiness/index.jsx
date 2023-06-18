import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setVerified } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const SignupBusiness = () => {
	const dispatch = useDispatch();

	const [companyName, setCompanyName] = useState('');
	const [companyNumber, setCompanyNumber] = useState('');
	const [companyPassword, setCompanyPassword] = useState('');
	const [companyEmail, setCompanyEmail] = useState('');
	const [isLoaded, setIsLoaded] = useState('false');
	const [data, setData] = useState('');

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

	useEffect(() => {
		registerCompany();
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

	async function registerCompany() {
		try {
			if (data['company_name'] == companyName && data['company_number'] == companyNumber) {
				const url = 'http://127.0.0.1:5000/businesses/register';
				const options = {
					business_name: companyName,
					business_number: companyNumber,
					business_email: companyEmail,
					business_password: companyPassword,
				};
				const res = await axios.post(url, options);
				const data = res.data;

				if (res.status === 200) {
					dispatch(setIsLoaded(true));

					await axios.post('http://127.0.0.1:5000/verify-business-email', {
						business_email: companyEmail,
						token: data.token,
					});
				}
			} else {
				dispatch(setIsLoaded(false));
			}
		} catch (error) {
			errorCreate('error LINE 73');
			console.error(error);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await getCompany(companyNumber);
	};

	const handleInputChange = (e, setValue) => {
		setValue(e.target.value);
	};

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="business-container">
				<label htmlFor="name" className="business-label">
					Company name:
				</label>
				<input type="text" id="name" value={companyName} onChange={(e) => handleInputChange(e, setCompanyName)} className="business-text" />

				<label htmlFor="number" className="business-label">
					Company number:
				</label>
				<input type="number" id="number" value={companyNumber} onChange={(e) => handleInputChange(e, setCompanyNumber)} className="business-text" />

				<label htmlFor="email" className="business-label">
					Email address:
				</label>
				<input type="email" id="email" value={companyEmail} onChange={(e) => handleInputChange(e, setCompanyEmail)} className="business-text" />

				<label htmlFor="password" className="business-label">
					Password:
				</label>
				<input type="password" id="password" value={companyPassword} onChange={(e) => handleInputChange(e, setCompanyPassword)} className="business-text" />

				<input type="submit" value="Register" className="login-register-button" />
			</form>

			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
			<ToastContainer />
		</div>
	);
};

export default SignupBusiness;
