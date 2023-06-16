import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Pages from './pages';
import { NavBar, LoginPage, LoginUse, Spinner } from './components';
import useToken from './components/useToken';
import { setToken, removeToken } from './actions';
import './App.css';

const App = () => {
	const { token } = useToken();

	const dispatch = useDispatch();
	const username = useSelector((state) => state.user.username);
	const password = useSelector((state) => state.user.password);
	console.log(username);

	const handleSetToken = (token) => {
		dispatch(setToken(token));
	};

	const handleRemoveToken = () => {
		dispatch(removeToken());
	};

	return (
		<>
			<Routes>
				<Route path="/" element={token ? <NavBar token={handleRemoveToken} /> : <Navigate to="/login-register" />}>
					<Route index element={token ? <Pages.Dashboard /> : <Navigate to="/login-register" />} />

					<Route path="/rota" element={token ? <Pages.Rota /> : <Navigate to="/login-register" />} />
					<Route path="/wellbeing" element={token ? <Pages.Wellbeing /> : <Navigate to="/login-register" />} token={handleSetToken} />

					<Route path="/profile/:username" element={token ? <Pages.Profile /> : <Navigate to="/login-register" />} />
					<Route path="/bookings" element={token ? <Pages.Booking /> : <Navigate to="/login-register" />} />
					<Route path="*" element={token ? <Pages.NotFound /> : <Navigate to="/login-register" />} />
					<Route path="/login-register" element={!token ? <LoginPage /> : <Navigate to="/" />} />
					<Route path="/home" element={token ? <Pages.Home /> : <Navigate to="/login-register" />} />
					<Route path="/spinner" element={token ? <Spinner /> : <Navigate to="/login-register" />} />
					<Route path="/chat" element={token ? <Pages.Chat /> : <Navigate to="/login-register" />} />

					<Route path="/login/user" element={!token ? <Pages.LoginUser /> : <Navigate to="/" />} />
					<Route path="/login/business" element={!token ? <Pages.LoginBusiness /> : <Navigate to="/" />} />
					<Route path="/signup/business" element={!token ? <Pages.SignupBusiness /> : <Navigate to="/" />} />
					<Route path="/signup/user" element={!token ? <Pages.SignupUser /> : <Navigate to="/" />} />
					<Route path="/login-user" element={!token ? <LoginUse /> : <Navigate to="/" />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
