import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from './pages';
import { NavBar } from './components';
import './App.css';

const App = () => {
	return (
		<Routes>
			<Route>
				<Route path="/home" element={<Pages.Home />} />
				<Route path="/" element={<NavBar />}>
					<Route path="/rota" element={<Pages.Rota />} />
					<Route path="/wellbeing" element={<Pages.Wellbeing />} />
					<Route path="/dashboard" element={<Pages.Dashboard />} />
					<Route path="/profile/:username" element={<Pages.Profile />} />
					<Route path="/login/user" element={<Pages.LoginUser />} />
					<Route path="/login/business" element={<Pages.LoginBusiness />} />
					<Route path="/signup/business" element={<Pages.SignupBusiness />} />
					<Route path="/signup/user" element={<Pages.SignupUser />} />

					<Route path="*" element={<Pages.NotFound />} />
				</Route>
			</Route>
		</Routes>
	);
};


export default App;
