import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Chat from './Chat';

jest.mock('axios');

describe('Chat Component', () => {
	afterEach(() => {
		jest.clearAllMocks();
		localStorage.clear();
	});

	it('renders correctly', () => {
		render(<Chat />);
		const chatElement = screen.getByTestId('chat-component');
		expect(chatElement).toBeInTheDocument();
	});

	it('fetches user password when isBusiness is false', async () => {
		const mockGet = jest.spyOn(axios, 'get').mockResolvedValue({ data: [{ user_username: 'testUser', user_password: 'testPassword' }] });

		render(<Chat />);

		expect(mockGet).toHaveBeenCalledWith('http://127.0.0.1:5000/users/');

		await screen.findByText('User password: testPassword');

		const chatEngineElement = screen.getByTestId('chat-engine-component');
		expect(chatEngineElement).toBeInTheDocument();
	});

	it('fetches business password when isBusiness is true', async () => {
		localStorage.setItem('isBusiness', 'true');

		const mockGet = jest.spyOn(axios, 'get').mockResolvedValue({ data: [{ business_name: 'testBusiness', business_password: 'testPassword' }] });

		render(<Chat />);

		expect(mockGet).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/');

		await screen.findByText('User not found');

		const chatEngineElement = screen.queryByTestId('chat-engine-component');
		expect(chatEngineElement).not.toBeInTheDocument();
	});

	it('handles error when fetching user password', async () => {
		const mockGet = jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));

		render(<Chat />);

		expect(mockGet).toHaveBeenCalledWith('http://127.0.0.1:5000/users/');

		await screen.findByText('API Error');

		const chatEngineElement = screen.queryByTestId('chat-engine-component');
		expect(chatEngineElement).not.toBeInTheDocument();
	});

	it('handles error when fetching business password', async () => {
		localStorage.setItem('isBusiness', 'true');

		const mockGet = jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));

		render(<Chat />);

		expect(mockGet).toHaveBeenCalledWith('http://127.0.0.1:5000/businesses/');

		await screen.findByText('API Error');

		const chatEngineElement = screen.queryByTestId('chat-engine-component');
		expect(chatEngineElement).not.toBeInTheDocument();
	});
});
