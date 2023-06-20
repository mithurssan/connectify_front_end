import { useState, useEffect } from 'react';

const useToken = () => {
	const getToken = () => {
		const userToken = localStorage.getItem('token');
		console.log('Retrieved token:', userToken);
		return userToken || '';
	};

	const [token, setToken] = useState(getToken());

	useEffect(() => {
		const storedToken = getToken();
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const saveToken = (userToken) => {
		localStorage.setItem('token', userToken);
		setToken(userToken);
	};

	const removeToken = () => {
		localStorage.removeItem('token');
		setToken('');
	};

	return {
		token,
		setToken: saveToken,
		removeToken,
	};
};

export default useToken;
