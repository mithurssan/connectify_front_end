import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LoginPageVerify from '.';

describe('Login Page Verify', () => {
	let mockAxios;

	beforeAll(() => {
		mockAxios = new MockAdapter(axios);
	});

	afterAll(() => {
		mockAxios.restore();
	});

	const initialState = {
		user: {
			companyName: 'AAA',
			token: '123abc',
		},
	};

	const mockStore = configureStore();
	let store;

	test('renders the LoginPageVerify component', () => {
		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPageVerify />
				</MemoryRouter>
			</Provider>
		);

		const signInText = screen.getByText('SIGN IN');
		expect(signInText).toBeInTheDocument();

		const loginBusinessVerifyComponent = screen.getByText('LoginBusinessVerify');
		expect(loginBusinessVerifyComponent).toBeInTheDocument();
	});
});
