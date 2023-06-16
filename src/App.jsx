import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Pages from './pages';
import { NavBar, LoginPage, LoginUse, Spinner } from './components';
import useToken from './components/useToken';
import { setToken, removeToken, loadPersistedState } from './actions';
import './App.css';

const App = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		dispatch(loadPersistedState());
	}, []);

	const handleSetToken = (token) => {
		dispatch(setToken(token));
	};

	const handleRemoveToken = () => {
		dispatch(removeToken());
	};

	return (
		<>
			<Routes>
				{/* <Route path="/" element={token ? <NavBar token={handleRemoveToken} /> : <Navigate to="/login-register" />}> */}
				<Route index element={token ? <Pages.Dashboard /> : <Navigate to="/login-register" />} />

				<Route path="/rota" element={token ? <Pages.Rota /> : <Navigate to="/login-register" />} />
				<Route path="/wellbeing" element={token ? <Pages.Wellbeing /> : <Navigate to="/login-register" />} />

				<Route path="/profile/:username" element={token ? <Pages.Profile /> : <Navigate to="/login-register" />} />
				<Route path="/bookings" element={token ? <Pages.Booking /> : <Navigate to="/login-register" />} />
				<Route path="/home" element={token ? <Pages.Home /> : <Navigate to="/login-register" />} />
				<Route path="/spinner" element={token ? <Spinner /> : <Navigate to="/login-register" />} />
				<Route path="/chat" element={token ? <Pages.Chat /> : <Navigate to="/login-register" />} />

				<Route path="/login-register" element={token ? null : <LoginUse token={handleSetToken} />} />
				<Route path="/login/user" element={token === null ? <Pages.LoginUser /> : <Navigate to="/" />} />
				<Route path="/login/business" element={token === null ? <Pages.LoginBusiness /> : <Navigate to="/" />} />
				<Route path="/signup/business" element={token === null ? <Pages.SignupBusiness /> : <Navigate to="/" />} />
				<Route path="/signup/user" element={token === null ? <Pages.SignupUser /> : <Navigate to="/" />} />
				<Route path="/login-user" element={token === null ? <LoginUse /> : <Navigate to="/" />} />
				<Route path="/*" element={token ? <Pages.NotFound /> : <Navigate to="/login-register" />} />
				{/* </Route> */}
			</Routes>
		</>
	);
};

export default App;
