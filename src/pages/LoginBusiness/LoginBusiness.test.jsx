import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LoginBusiness from '.';

describe('LoginBusiness page', () => {
	let mockAxios;

	beforeAll(() => {
		mockAxios = new MockAdapter(axios);
	});

	afterAll(() => {
		mockAxios.restore();
	});

	test('renders the login form', () => {
		render(<LoginBusiness />);
		const businessNameInput = screen.getByLabelText('Business name:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		expect(businessNameInput).toBeDefined();
		expect(passwordInput).toBeDefined();
		expect(loginButton).toBeDefined();
	});

	test('submits the form with correct credentials', async () => {
		render(<LoginBusiness />);
		const businessNameInput = screen.getByLabelText('Business name:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		const url = 'http://127.0.0.1:5000/businesses/login';
		const expectedOptions = {
			business_name: 'testbusiness',
			business_password: 'testpassword',
		};

		mockAxios.onPost(url, expectedOptions).reply(200);

		fireEvent.change(businessNameInput, { target: { value: 'testbusiness' } });
		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await screen.findByText('Correct Credentials');
		expect(mockAxios.history.post.length).toBe(1);
		expect(mockAxios.history.post[0].url).toBe(url);
		expect(mockAxios.history.post[0].data).toEqual(JSON.stringify(expectedOptions));
	});

	test('shows error for incorrect credentials', async () => {
		vi.spyOn(axios, 'post').mockRejectedValueOnce({ response: { status: 401 } });

		render(<LoginBusiness />);
		const businessNameInput = screen.getByLabelText('Business name:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(businessNameInput, { target: { value: 'testbusiness' } });
		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(screen.getByText('Incorrect Credentials')).toBeDefined();
		});
	});

	test('shows error when businessName is empty', async () => {
		render(<LoginBusiness />);
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(screen.getByText('Incorrect Credentials')).toBeDefined();
		});
	});

	test('shows error when password is empty', async () => {
		render(<LoginBusiness />);
		const businessNameInput = screen.getByLabelText('Business name:');
		const loginButton = screen.getByText('Login');

		fireEvent.change(businessNameInput, { target: { value: 'testbusiness' } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(screen.getByText('Incorrect Credentials')).toBeDefined();
		});
	});
});
