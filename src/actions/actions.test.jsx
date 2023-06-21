import {
	setToken,
	removeToken,
	setUsername,
	setEmail,
	setPassword,
	setVerifyToken,
	setCompanyName,
	setCompanyEmail,
	setCompanyPassword,
	setCompanyNumber,
	setVerified,
	setIsLoaded,
	setError,
} from '.';
import { describe, test, expect } from 'vitest';

describe('Redux Actions', () => {
	test('setToken action', () => {
		const token = 'abc123';
		const expectedAction = {
			type: 'SET_TOKEN',
			payload: token,
		};
		expect(setToken(token)).toEqual(expectedAction);
	});

	test('removeToken action', () => {
		const expectedAction = {
			type: 'REMOVE_TOKEN',
		};
		expect(removeToken()).toEqual(expectedAction);
	});

	test('setUsername action', () => {
		const username = 'john_doe';
		const expectedAction = {
			type: 'SET_USERNAME',
			payload: username,
		};
		expect(setUsername(username)).toEqual(expectedAction);
	});

	test('setEmail action', () => {
		const email = 'test@example.com';
		const expectedAction = {
			type: 'SET_EMAIL',
			payload: email,
		};
		expect(setEmail(email)).toEqual(expectedAction);
	});

	test('setPassword action', () => {
		const password = 'password123';
		const expectedAction = {
			type: 'SET_PASSWORD',
			payload: password,
		};
		expect(setPassword(password)).toEqual(expectedAction);
	});

	test('setVerifyToken action', () => {
		const verifyToken = 'abc123xyz';
		const expectedAction = {
			type: 'SET_VERIFY_TOKEN',
			payload: verifyToken,
		};
		expect(setVerifyToken(verifyToken)).toEqual(expectedAction);
	});

	test('setCompanyName action', () => {
		const companyName = 'ABC Company';
		const expectedAction = {
			type: 'SET_BUSINESS_NAME',
			payload: companyName,
		};
		expect(setCompanyName(companyName)).toEqual(expectedAction);
	});

	test('setCompanyEmail action', () => {
		const companyEmail = 'info@abc.com';
		const expectedAction = {
			type: 'SET_BUSINESS_EMAIL',
			payload: companyEmail,
		};
		expect(setCompanyEmail(companyEmail)).toEqual(expectedAction);
	});

	test('setCompanyPassword action', () => {
		const companyPassword = 'password123';
		const expectedAction = {
			type: 'SET_BUSINESS_PASSWORD',
			payload: companyPassword,
		};
		expect(setCompanyPassword(companyPassword)).toEqual(expectedAction);
	});

	test('setCompanyNumber action', () => {
		const companyNumber = '1234567890';
		const expectedAction = {
			type: 'SET_BUSINESS_NUMBER',
			payload: companyNumber,
		};
		expect(setCompanyNumber(companyNumber)).toEqual(expectedAction);
	});

	test('setVerified action', () => {
		const verified = true;
		const expectedAction = {
			type: 'SET_VERIFIED',
			payload: verified,
		};
		expect(setVerified(verified)).toEqual(expectedAction);
	});

	test('setIsLoaded action', () => {
		const isLoaded = true;
		const expectedAction = {
			type: 'SET_IS_LOADED',
			payload: isLoaded,
		};
		expect(setIsLoaded(isLoaded)).toEqual(expectedAction);
	});

	test('setError action', () => {
		const error = true;
		const expectedAction = {
			type: 'SET_ERROR',
			payload: error,
		};
		expect(setError(error)).toEqual(expectedAction);
	});
});
