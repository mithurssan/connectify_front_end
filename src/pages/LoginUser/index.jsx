import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken, setUsername, setPassword, setIsLoaded, setEmails, setVerified } from '../../actions';
import LoginImage from '../../assets/Connectify.jpg';
import { Spinner } from '../../components';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';
import './style.css';

const LoginUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [password, setPassword] = useState('')
	const [isLoaded, setIsLoaded] = useState(false);

	const username = useSelector((state) => state.user.username);
	const password = useSelector((state) => state.user.password);
	const email = useSelector((state) => state.user.email);
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
			loginUser();
		}
	}, [verified, isLoaded]);

	useEffect(() => {
		const pageName = 'user-login';
		const hasShownIntro = localStorage.getItem(`hasShownIntro_${pageName}`);
	
		if (!hasShownIntro) {
		  const intro = introJs();
		  intro.setOptions({
			steps: [
			  {
				intro: 'Welcome to the user login page!',
			  },
			  {
				element: '.user-container',
				intro: 'Enter your information to be able to login as a user.',
			  },
			  {
				element: '.login-register-button',
				intro: 'Click here to log in.',
			  },
			],
		  });
		  intro.start();
	
		  localStorage.setItem(`hasShownIntro_${pageName}`, 'true');
		}
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

	const loginUser = async () => {
		// dispatch(setIsLoaded(false));
		try {
			const url = 'https://connectify-server-b31a.onrender.com/users/login';
			const data = {
				user_username: username,
				user_password: password,
			};
			const res = await axios.post(url, data);

			if (verified) {
				dispatch(setToken(res.data.token));
				const business_name = res.data.user_business_name;
				const business_id = res.data.business_id;
				const user_id = res.data.user_id;
				localStorage.setItem('joinedBusiness', true);
				localStorage.setItem('business_name', business_name);
				localStorage.setItem('business_id', business_id);
				localStorage.setItem('user_id', user_id);
				dispatch(setPassword(res.data.user_password));
			} else if (!verified) {
				errorCreate('Verify your account');
			}
			const business_id = res.data.business_id;

			if (business_id == null) {
				navigate('/not-assigned');
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error, 'error');
			if (error && password.length != 0) {
				errorCreate('Incorrect credentials');
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (username.length === 0 || password.length === 0) {
			errorCreate('Enter username and password');
			setTimeout(() => {
				setIsLoaded(false);
			}, 500);
		} else {
			getUsers();
			setIsLoaded(true);
		}
	};

	async function getUsers() {
		try {
			const url = 'https://connectify-server-b31a.onrender.com/users/';
			const res = await axios.get(url);
			const data = await res.data;

			const user = data.find((u) => u.user_username === username);
			setIsLoaded(true);
			dispatch(setEmails(user.user_email));
			dispatch(setVerified(user.user_verified));
		} catch (error) {
			if (error) {
				errorCreate("User doesn't exist");
			}
		}
	}

	return (
		<div className="container-login-register">
			<form onSubmit={handleSubmit} className="user-container">
				<label htmlFor="username" className="user-label">
					Username:
				</label>
				<input type="text" id="username" value={username} onChange={(e) => dispatch(setUsername(e.target.value))} className="user-text" />

				<label htmlFor="password" className="user-label">
					Password:
				</label>
				<input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} className="user-text" />
				<input type="submit" value="Login" className="login-register-button" />
				<div className="container">
					<Link to="/login-register" className="sign-in-user">
						Login as a Business
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

export default LoginUser;
