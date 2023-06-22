import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LoginUseVerify from '.';

describe('Login Use Verify', () => {
	let mockAxios;

	beforeAll(() => {
		mockAxios = new MockAdapter(axios);
	});

	afterAll(() => {
		mockAxios.restore();
	});

	const initialState = {
		user: {
			username: 'AAA',
			token: '123abc',
		},
	};

	const mockStore = configureStore();
	let store;

	test('renders the LoginUseVerify component', () => {
		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginUseVerify />
				</MemoryRouter>
			</Provider>
		);

		const signInText = screen.getByText('SIGN IN');
		expect(signInText).toBeDefined();

		const loginUserVerifyComponent = screen.getByText('LoginUserVerify');
		expect(loginUserVerifyComponent).toBeDefined();
	});
});
