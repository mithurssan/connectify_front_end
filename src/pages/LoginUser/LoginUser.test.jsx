import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LoginUser from '.';

import { setToken } from '../../actions';

describe('LoginUser page', () => {
	let mockAxios;

	beforeAll(() => {
		mockAxios = new MockAdapter(axios);
	});

	afterAll(() => {
		mockAxios.restore();
	});

	const initialState = {
		user: {
			username: '',
			password: '',
		},
		app: {
			verified: false,
			isLoaded: false,
		},
	};

	const mockStore = configureStore();
	let store;

	test('renders the login form', () => {
		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUser />
				</MemoryRouter>
			</Provider>
		);

		const usernameInput = screen.getByLabelText('Username:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		expect(usernameInput).toBeDefined();
		expect(passwordInput).toBeDefined();
		expect(loginButton).toBeDefined();
	});

	test('navigate to dashboard if correct credentials', async () => {
		let navigatePath = '/dashboard';

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUser />
				</MemoryRouter>
			</Provider>
		);

		fireEvent.change(screen.getByLabelText('Username:'), {
			target: { value: 'example' },
		});
		fireEvent.change(screen.getByLabelText('Password:'), {
			target: { value: 'password' },
		});

		fireEvent.click(screen.getByText('Login'));
		await waitFor(() => {
			expect(navigatePath).toBe('/dashboard');
		});
	});

	test('shows error for incorrect credentials', async () => {
		mockAxios.onPost('http://127.0.0.1:5000/users/login').reply(401);

		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUser />
				</MemoryRouter>
			</Provider>
		);

		const usernameInput = screen.getByLabelText('Username:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(usernameInput, { target: { value: 'testusername' } });
		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			const errorMessage = screen.getByText('Enter username and password');
			expect(errorMessage).toBeDefined();
		});
	});

	test('shows error when username is empty', async () => {
		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUser />
				</MemoryRouter>
			</Provider>
		);

		const passwordInput = screen.getAllByLabelText('Password:')[0];
		const loginButton = screen.getAllByText('Login')[0];

		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			const errorMessage = screen.getByText('Enter username and password');
			expect(errorMessage).toBeDefined();
		});
	});

	test('shows error when password is empty', async () => {
		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUser />
				</MemoryRouter>
			</Provider>
		);

		const usernameInput = screen.getAllByLabelText('Username:')[0];
		const loginButton = screen.getAllByText('Login')[0];

		fireEvent.change(usernameInput, { target: { value: 'testuser' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			const errorMessage = screen.getByText('Enter username and password');
			expect(errorMessage).toBeDefined();
		});
	});

	test('dispatches setToken action with stored token', () => {
		const storedToken = 'exampleToken';
		const dispatchSpy = vi.mock(store, 'dispatch');

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUser />
				</MemoryRouter>
			</Provider>
		);

		localStorage.setItem('token', storedToken);

		store.dispatch = dispatchSpy;

		render(null, { store });

		expect(dispatchSpy).toHaveBeenCalledWith(setToken(storedToken));
	});
});
