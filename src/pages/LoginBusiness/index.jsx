import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken, setCompanyName, setIsLoaded, setVerified } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';

const LoginBusiness = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [companyPassword, setCompanyPassword] = useState('');

	const companyName = useSelector((state) => state.business.companyName);
	const verified = useSelector((state) => state.app.verified);
	const isLoaded = useSelector((state) => state.app.isLoaded);

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
		if (verified && isLoaded) {
			loginBusiness();
		}
	}, [verified, isLoaded]);

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

	const loginBusiness = async () => {
		dispatch(setIsLoaded(false));
		try {
			const url = 'http://127.0.0.1:5000/businesses/login';
			const options = {
				business_name: companyName,
				business_password: companyPassword,
			};
			const res = await axios.post(url, options);

			if (verified) {
				dispatch(setToken(res.data.token));
				navigate('/dashboard');
			}
		} catch (error) {
			if (error && companyPassword.length != 0) {
				errorCreate('Incorrect credentials');
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (companyName.length === 0 || companyPassword.length === 0) {
			errorCreate('Enter business name and password');
			dispatch(setIsLoaded(false));
		} else {
			getCompanies();
			dispatch(setIsLoaded(true));
		}
	};

	async function getCompanies() {
		try {
			const url = 'http://127.0.0.1:5000/businesses/';
			const res = await axios.get(url);
			const data = await res.data;

			const business = data.find((b) => b.business_name === companyName);

			dispatch(setVerified(business.business_verified));
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
						setCompanyPassword(e.target.value);
					}}
					className="business-text"
				/>

				<input type="submit" value="Login" className="login-register-button" />
				<div className="container">
					<Link to="/login-user" className="sign-in-user">
						Login as a User
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

export default LoginBusiness;
