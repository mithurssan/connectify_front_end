import { useState, useEffect } from 'react';

const useToken = () => {
	function getToken() {
		const userToken = localStorage.getItem('token');
		console.log('Retrieved token:', userToken);
		return userToken && userToken;
	}
	const [token, setToken] = useState(getToken());

	function saveToken(userToken) {
		localStorage.setItem('token', userToken);
		setToken(userToken);
	}

	function removeToken() {
		localStorage.removeItem('token');
		setToken(null);
	}

	return {
		token,
		setToken: saveToken,
		removeToken,
	};
};

export default useToken;
