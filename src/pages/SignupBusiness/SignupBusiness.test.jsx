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
			company_name: 'TEST COMPANY',
			company_number: 123456,
		};

		const mockPostResponse = {
			status: 200,
			data: { message: 'Business registered successfully' },
		};

		vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });
		vi.spyOn(axios, 'post').mockResolvedValueOnce(mockPostResponse);

		render(<SignupBusiness />);

		fireEvent.change(screen.getByLabelText('Company name:'), { target: { value: 'TEST COMPANY' } });
		fireEvent.change(screen.getByLabelText('Company number:'), { target: { value: 123456 } });
		fireEvent.change(screen.getByLabelText('Email address:'), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

		fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0]);

		await waitFor(() => {
			expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/company/123456', mockData);
			expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/register', {
				business_name: 'Test Company',
				business_number: 123456,
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
		const mockData = {
			company_name: 'TEST COMPANY',
			company_number: 123456,
		};

		const mockPostResponse = {
			status: 400,
			data: { message: 'Invalid credentials' },
		};

		vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });
		vi.spyOn(axios, 'post').mockRejectedValueOnce(mockPostResponse);

		render(<SignupBusiness />);

		fireEvent.change(screen.getByLabelText('Company name:'), { target: { value: 'TEST COMPANY' } });
		fireEvent.change(screen.getByLabelText('Company number:'), { target: { value: 123456 } });
		fireEvent.change(screen.getByLabelText('Email address:'), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

		fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0]);

		await waitFor(() => {
			expect(axios.get).toHaveBeenCalledWith(`http://127.0.0.1:5000/api/company/123456`, mockData);
			expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/register', {
				business_name: 'TEST COMPANY',
				business_number: 123456,
				business_email: 'test@example.com',
				business_password: 'testpassword',
			});
		});

		expect(screen.getByRole('heading', { name: 'Incorrect Credentials' })).toBeDefined();
	});

	// async function getCompany(number) {
	// 	try {
	// 		const url = `http://127.0.0.1:5000/api/company/${number}`;
	// 		const res = await axios.get(url);
	// 		const data = res.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// test('handles error in catch block', async () => {
	// 	const mockError = new Error('Request failed');
	// 	const mockNumber = 123456;
	// 	const axiosGetSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce(mockError);
	// 	const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation();

	// 	try {
	// 		await getCompany(mockNumber);
	// 		expect(true).toBe(false);
	// 	} catch (error) {
	// 		expect(axiosGetSpy).toHaveBeenCalledWith(`http://127.0.0.1:5000/api/company/${mockNumber}`);
	// 		expect(consoleLogSpy).toHaveBeenCalledWith(mockError);
	// 	}
	// });
});
