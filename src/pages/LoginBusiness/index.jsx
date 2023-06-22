import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken, setCompanyName, setCompanyPassword, setCompanyEmail, setVerified } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import './style.css';
import { Spinner } from '../../components';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

const LoginBusiness = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [companyPassword, setCompanyPassword] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	const companyName = useSelector((state) => state.business.companyName);
	const companyPassword = useSelector((state) => state.business.companyPassword);
	const companyEmail = useSelector((state) => state.business.companyEmail);
	const verified = useSelector((state) => state.app.verified);

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

	useEffect(() => {
		const intro = introJs();
		intro.setOptions({
			steps: [
				{
					intro: 'Welcome to the business login page!',
				},
				{
					element: '.business-container',
					intro: 'Enter your information to be able to login as a business.',
				},
				{
					element: '.login-register-button',
					intro: 'Click here to log in.',
				},
			],
		});
		intro.start();
	}, []);

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

	const loginBusiness = async () => {
		try {
			const url = 'http://127.0.0.1:5000/businesses/login';
			const options = {
				business_name: companyName,
				business_password: companyPassword,
			};
			const res = await axios.post(url, options);

			if (verified) {
				const business_id = res.data.business_id;
				const business_name = res.data.business_name;

				dispatch(setToken(res.data.token));
				localStorage.setItem('business_name', business_name);
				localStorage.setItem('business_id', business_id);
				localStorage.setItem('isBusiness', true);
				localStorage.setItem('joinedBusiness', true);
				dispatch(setCompanyPassword(res.data.business_password));
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
			setTimeout(() => {
				setIsLoaded(false);
			}, 500);
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
			setIsLoaded(true);
			dispatch(setVerified(business.business_verified));
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
				<div className="container">
					<Link to="/login-user" className="sign-in-user">
						Login as a User
					</Link>
				</div>
				<div className="error-message-container">
					{isLoaded && (
						<div className="spinner" data-testid="spinner">
							<Spinner />
						</div>
					)}
				</div>
			</form>

			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
			<ToastContainer />
		</div>
	);
};

export default LoginBusiness;
