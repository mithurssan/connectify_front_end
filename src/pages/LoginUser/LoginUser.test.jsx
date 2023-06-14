import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import LoginUser from '.';

describe('LoginUser page', () => {
	let mockAxios;

	beforeAll(() => {
		mockAxios = new MockAdapter(axios);
	});

	afterAll(() => {
		mockAxios.restore();
	});

	test('renders the login form', () => {
		render(<LoginUser />);
		const usernameInput = screen.getByLabelText('Username:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		expect(usernameInput).toBeDefined();
		expect(passwordInput).toBeDefined();
		expect(loginButton).toBeDefined();
	});

	test('submits the form with correct credentials', async () => {
		render(<LoginUser />);
		const usernameInput = screen.getByLabelText('Username:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		const url = 'http://127.0.0.1:5000/users/login';
		const expectedOptions = {
			user_username: 'testuser',
			user_password: 'testpassword',
		};

		mockAxios.onPost(url, expectedOptions).reply(200);

		fireEvent.change(usernameInput, { target: { value: 'testuser' } });
		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await screen.findByText('Correct Credentials');
		expect(mockAxios.history.post.length).toBe(1);
		expect(mockAxios.history.post[0].url).toBe(url);
		expect(mockAxios.history.post[0].data).toEqual(JSON.stringify(expectedOptions));
	});

	test('shows error for incorrect credentials', async () => {
		vi.spyOn(axios, 'post').mockRejectedValueOnce({ response: { status: 401 } });

		render(<LoginUser />);
		const usernameInput = screen.getByLabelText('Username:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(usernameInput, { target: { value: 'testuser' } });
		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(screen.getByText('Incorrect Credentials')).toBeDefined();
		});
	});

	test('shows error when username is empty', async () => {
		render(<LoginUser />);

		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(screen.getByText('Correct Credentials')).toBeDefined();
		});
	});

	test('shows error when password is empty', async () => {
		render(<LoginUser />);
		const usernameInput = screen.getByLabelText('Username:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(usernameInput, { target: { value: 'testuser' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(screen.getByText('Correct Credentials')).toBeDefined();
		});
	});
});
