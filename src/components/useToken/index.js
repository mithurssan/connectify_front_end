import React, { useState, useEffect } from 'react';

const useToken = () => {
	const [token, setToken] = useState(getToken());

	useEffect(() => {
		const storedToken = getToken();
		if (storedToken && token === null) {
			setToken(storedToken);
		}
	}, [token]);

	function getToken() {
		const userToken = localStorage.getItem('token');
		return userToken && userToken;
	}

	function saveToken(userToken) {
		localStorage.setItem('token', userToken);
		setToken(userToken);
	}

	function removeToken() {
		localStorage.removeItem('token');
		setToken(null);
	}

	return {
		setToken: saveToken,
		token,
		removeToken,
	};
};

export default useToken;
