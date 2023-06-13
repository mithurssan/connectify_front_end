import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import axios from 'axios';
import SignupBusiness from '.';

describe('SignupBusiness page', () => {
	test('renders the SignupBusiness component', () => {
		render(<SignupBusiness />);

		expect(screen.getByLabelText('Company name:')).toBeDefined();
		expect(screen.getByLabelText('Company number:')).toBeDefined();
		expect(screen.getByLabelText('Email address:')).toBeDefined();
		expect(screen.getByLabelText('Password:')).toBeDefined();
		expect(screen.getByRole('button', { name: 'Register' })).toBeDefined();
	});

	test('submits the form with correct credentials', async () => {
		const mockData = {
			company_name: 'test company',
			company_number: '123456',
		};

		const mockPostResponse = {
			status: 200,
			data: { message: 'Business registered successfully' },
		};

		vi.spyOn(axios, 'get').mockRejectedValueOnce({ data: mockData });
		vi.spyOn(axios, 'post').mockRejectedValueOnce(mockPostResponse);

		render(<SignupBusiness />);

		fireEvent.change(screen.getByLabelText('Company name:'), { target: { value: 'Test Company' } });
		fireEvent.change(screen.getByLabelText('Company number:'), { target: { value: '12345' } });
		fireEvent.change(screen.getByLabelText('Email address:'), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

		fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0]);

		await waitFor(() => {
			expect(axios.get).toHaveBeenCalledOnce();
			expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/register', {
				business_name: 'Test Company',
				business_number: '12345',
				business_email: 'test@example.com',
				business_password: 'testpassword',
			});
		});

		expect(screen.getByRole('heading', { name: 'Correct Credentials' })).toBeDefined();
		// expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/register', {
		// 	business_name: 'Test Company',
		// 	business_number: '12345',
		// 	business_email: 'test@example.com',
		// 	business_password: 'testpassword',
		// });
	});

	test('submits the form with incorrect credentials', async () => {
		const mockResponse = {
			data: {
				company_name: 'test company',
				company_number: '123456',
			},
		};

		const mockPostResponse = {
			status: 400,
			data: { message: 'Invalid credentials' },
		};

		const getMock = vi.spyOn(axios, 'get').mockRejectedValueOnce(mockResponse);
		const postMock = vi.spyOn(axios, 'post').mockRejectedValueOnce(mockPostResponse);

		render(<SignupBusiness />);

		fireEvent.change(screen.getByLabelText('Company name:'), { target: { value: 'Test Company' } });
		fireEvent.change(screen.getByLabelText('Company number:'), { target: { value: '12345' } });
		fireEvent.change(screen.getByLabelText('Email address:'), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

		fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0]);

		await waitFor(() => expect(getMock).toHaveBeenCalledTimes(1));
		await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));

		expect(screen.getByRole('heading', { name: 'Incorrect Credentials' })).toBeDefined();

		getMock.mockRestore();
		postMock.mockRestore();
	});
});
