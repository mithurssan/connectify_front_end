import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken, setCompanyName, setCompanyPassword, setCompanyEmail, setIsLoaded, setVerified, setVerifyToken } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const LoginBusinessVerify = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [companyPassword, setCompanyPassword] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	const companyName = useSelector((state) => state.business.companyName);
	const companyPassword = useSelector((state) => state.business.companyPassword);
	const companyEmail = useSelector((state) => state.business.companyEmail);
	const verifyToken = useSelector((state) => state.business.verifyToken);

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const storedToken = localStorage.getItem('token');
				if (storedToken) {
					dispatch(setToken(storedToken));
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchToken();
	}, [dispatch]);

	useEffect(() => {
		if (verifyToken && isLoaded) {
			loginBusinessForFirstTime(verifyToken);
		}
	}, [verifyToken, isLoaded]);

	const errorCreate = (error) =>
		toast.error(error, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});

	const loginBusinessForFirstTime = async (verifyToken) => {
		const url = window.location.href;
		const tokenUrl = url.split('/');
		if (verifyToken != tokenUrl[5]) {
			errorCreate('Wrong Credentials');
		} else {
			try {
				const url = `http://127.0.0.1:5000/businesses/verify/${verifyToken}`;
				const options = {
					business_name: companyName,
					business_password: companyPassword,
				};
				const res = await axios.post(url, options);
				dispatch(setToken(res.data.token));
				dispatch(setVerified(true));
				const business_name = res.data.business_name;
				const business_id = res.data.business_id;
				localStorage.setItem('business_id', business_id);
				localStorage.setItem('isBusiness', true);
				localStorage.setItem('joinedBusiness', true);
				localStorage.setItem('business_name', business_name);
				dispatch(setCompanyPassword(res.data.business_password));
				navigate('/dashboard');
			} catch (error) {
				if (error && companyPassword.length != 0) {
					errorCreate('Incorrect credentials');
				}
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (companyName.length === 0 || companyPassword.length === 0) {
			errorCreate('Enter business name and password');
			setIsLoaded(false);
		} else {
			getCompanies();
			setIsLoaded(true);
		}
	};

	async function getCompanies() {
		try {
			const url = 'http://127.0.0.1:5000/businesses/';
			const res = await axios.get(url);
			const data = await res.data;

			const business = data.find((b) => b.business_name === companyName);

			dispatch(setVerifyToken(business.business_verify_token));
			dispatch(setCompanyEmail(business.business_email));
		} catch (error) {
			if (error) {
				errorCreate("Business doesn't exist");
			}
		}
	}

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="business-container">
				<label htmlFor="username" className="business-label">
					Business name:
				</label>
				<input
					type="text"
					id="username"
					value={companyName}
					onChange={(e) => {
						dispatch(setCompanyName(e.target.value));
					}}
					className="business-text"
				/>

				<label htmlFor="password" className="business-label">
					Password:
				</label>

				<input
					type="password"
					id="password"
					value={companyPassword}
					onChange={(e) => {
						dispatch(setCompanyPassword(e.target.value));
					}}
					className="business-text"
				/>

				<input type="submit" value="Login" className="login-register-button" />
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

export default LoginBusinessVerify;
