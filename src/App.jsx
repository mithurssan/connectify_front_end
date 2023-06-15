import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Pages from './pages'
import { NavBar, LoginPage, LoginUse, Spinner } from './components'
import useToken from './components/useToken';
import './App.css';

const App = () => {
  
const {token, setToken, removeToken} = useToken()

	return (
		<>
			{!token && token !== '' && token !== undefined ? (
				<Pages.LoginUser setToken={setToken} />
			) : (
				<Routes>
					<Route path="/" element={<NavBar token={removeToken} />}>
						<Route index element={<Pages.Dashboard />} />
						<Route path="/rota" element={<Pages.Rota />} />
						<Route path="/wellbeing" element={<Pages.Wellbeing />} />
						<Route index element={<Pages.Dashboard />} />
						<Route path="/profile/:username" element={<Pages.Profile />} />
						<Route path="/bookings" element={<Pages.Booking />} />
						<Route path="*" element={<Pages.NotFound />} />
					</Route>
					<Route path="/" element={<Pages.Home />} />
					<Route path="/login/user" element={<Pages.LoginUser />} />
					<Route path="/login/business" element={<Pages.LoginBusiness />} />
					<Route path="/signup/business" element={<Pages.SignupBusiness />} />
					<Route path="/signup/user" element={<Pages.SignupUser />} />
					<Route path="/login-register" element={<LoginPage />} />
					<Route path="/login-user" element={<LoginUse />} />
					<Route path='/spinner' element={<Spinner />} />
				</Routes>
			)}
		</>
	);
};

export default App;
