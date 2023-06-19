import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Pages from './pages'
import { NavBar, LoginPage, LoginUse, Spinner } from './components'
import useToken from './components/useToken'
import './App.css'
const App = () => {
	const { token, setToken, removeToken } = useToken()
	return (
		<>
			<Routes>
				<Route path='/' element={<NavBar token={removeToken} />}>
					<Route index element={<Pages.Dashboard />} />
					<Route path='/rota' element={<Pages.Rota />} />
					<Route path='/wellbeing' element={<Pages.Wellbeing />} />
					<Route index element={<Pages.Dashboard />} />
					<Route path='/profile/:username' element={<Pages.Profile />} />
					<Route path='/bookings' element={<Pages.Booking />} />
					<Route path='*' element={<Pages.NotFound />} />
				</Route>
				<Route path='/Home' element={<Pages.Home />} />
				<Route path='/login/user' element={<Pages.LoginUser />} />
				<Route path='/login/business' element={<Pages.LoginBusiness />} />
				<Route path='/signup/business' element={<Pages.SignupBusiness />} />
				<Route path='/signup/user' element={<Pages.SignupUser />} />
				<Route
					path='/login-register'
					element={<LoginPage setToken={setToken} />}
				/>
				<Route path='/login-user' element={<LoginUse setToken={setToken} />} />
				<Route path='/spinner' element={<Spinner />} />
			</Routes>
		</>
	)
}
export default App
=======
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Pages from './pages';
import { NavBar, LoginPage, LoginUse, LoginUseVerify, Spinner } from './components';
import { loadPersistedState } from './localStorage';
import './App.css';

const App = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const verified = useSelector((state) => state.app.verified);

	useEffect(() => {
		dispatch(loadPersistedState());
	}, []);

	return (
		<>
			{!token ? (
				<>
					<Routes>
						<Route path="/" element={<Pages.Home />} />
						<Route path="/login-register" element={<LoginPage />} />
						<Route path="/login-user" element={<LoginUse />} />
						<Route path="/users/verify/:token" element={<LoginUseVerify />} />
					</Routes>
				</>
			) : (
				<Routes>
					<Route path="/" element={<NavBar />}>
						<Route path="/dashboard" element={<Pages.Dashboard />} />
						<Route path="/rota" element={<Pages.Rota />} />
						<Route path="/wellbeing" element={<Pages.Wellbeing />} />
						<Route path="/profile/:username" element={<Pages.Profile />} />
						<Route path="/bookings" element={<Pages.Booking />} />
						<Route path="/chat" element={<Pages.Chat />} />
						<Route path="/not-assigned" element={<Pages.NotAssignedBusiness />} />
						<Route path="*" element={<Pages.NotFound />} />
					</Route>

					<Route path="/login/user" element={<Pages.LoginUser />} />
					<Route path="/login/business" element={<Pages.LoginBusiness />} />
					<Route path="/signup/business" element={<Pages.SignupBusiness />} />
					<Route path="/signup/user" element={<Pages.SignupUser />} />
					<Route path="/login-register" element={<LoginPage />} />
					<Route path="/login-user" element={<LoginUse />} />
				</Routes>
			)}
		</>
	);
};

export default App;
