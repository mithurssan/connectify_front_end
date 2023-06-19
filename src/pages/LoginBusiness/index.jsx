import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, setCompanyName, setCompanyPassword, setIsLoaded, setError } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';

import './style.css';

const LoginBusiness = () => {
	const dispatch = useDispatch();
	const companyName = useSelector((state) => state.business.companyName);
	const companyPassword = useSelector((state) => state.business.companyPassword);
	const isLoaded = useSelector((state) => state.app.isLoaded);
	const error = useSelector((state) => state.app.error);
	const navigate = useNavigate()

	const loginBusiness = async () => {
		try {
			const url = 'http://127.0.0.1:5000/businesses/login';
			const options = {
				business_name: companyName,
				business_password: companyPassword,
			};
			const res = await axios.post(url, options);

			dispatch(setToken(res.data.token));
			console.log('Token dispatched:', res.data.token)
			console.log(dispatch(setToken(res.data.token)))
			const business_id = res.data.business_id
			localStorage.setItem('business_id', business_id);
			localStorage.setItem('isBusiness', true);
			localStorage.setItem('joinedBusiness', true);
			navigate("/dashboard")
		} catch (error) {
			console.log(error, 'error');
			if (error.response.status == 401) {
				dispatch(setIsLoaded(false));
				dispatch(setError(true));
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (companyName.length === 0 || companyPassword.length === 0) {
			setIsLoaded(false);
			setError(true);
		} else {
			loginBusiness();

			dispatch(setIsLoaded(true));
			dispatch(setError(false));
		}
	};

	const handleInputBusinessName = (e) => {
		dispatch(setCompanyName(e.target.value));
	};

	const handleInputPassword = (e) => {
		dispatch(setCompanyPassword(e.target.value));
	};

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="business-container">
				<label htmlFor="username" className="business-label">
					Business name:
				</label>
				<input type="text" id="username" value={companyName} onChange={handleInputBusinessName} className="business-text" />

				<label htmlFor="password" className="business-label">
					Password:
				</label>

				<input type="password" id="password" value={companyPassword} onChange={handleInputPassword} className="business-text" />

				<input type="submit" value="Login" className="login-register-button" />
				<div className="container">
					<Link to="/login-user" className="sign-in-user">
						Login as a User
					</Link>
				</div>
			</form>

			{isLoaded && console.log('Correct Credentials')}
			{error && console.log('Incorrect Credentials')}

			<div className="login-register-image">
				<img src={LoginImage} alt="login-page" className="image" />
			</div>
		</div>
	);
};

export default LoginBusiness;
