export const setToken = (token) => {
	localStorage.setItem('token', token);
	return {
		type: 'SET_TOKEN',
		payload: token,
	};
};

export const removeToken = () => {
	localStorage.removeItem('token');
	return {
		type: 'REMOVE_TOKEN',
	};
};

export const setUsername = (username) => {
	return {
		type: 'SET_USERNAME',
		payload: username,
	};
};

export const setEmail = (email) => {
	return {
		type: 'SET_EMAIL',
		payload: email,
	};
};

export const setPassword = (password) => {
	return {
		type: 'SET_PASSWORD',
		payload: password,
	};
};

export const setCompanyName = (companyName) => {
	return {
		type: 'SET_BUSINESS_NAME',
		payload: companyName,
	};
};

export const setCompanyEmail = (companyEmail) => {
	return {
		type: 'SET_BUSINESS_EMAIL',
		payload: companyEmail,
	};
};

export const setCompanyPassword = (companyPassword) => {
	return {
		type: 'SET_BUSINESS_PASSWORD',
		payload: companyPassword,
	};
};
export const setCompanyNumber = (companyNumber) => {
	return {
		type: 'SET_BUSINESS_NUMBER',
		payload: companyNumber,
	};
};

export const setIsLoaded = (isLoaded) => ({
	type: 'SET_IS_LOADED',
	payload: isLoaded,
});

export const setError = (error) => ({
	type: 'SET_ERROR',
	payload: error,
});
