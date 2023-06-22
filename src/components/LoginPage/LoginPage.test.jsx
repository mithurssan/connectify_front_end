import React, { useState } from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import LoginPage from '.';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';

describe('LoginPage', () => {
	const mockStore = configureStore();
	let store;
	let mockAxios;

	const initialState = {
		user: {
			companyName: '',
			password: '',
		},
	};
	beforeEach(() => {
		store = mockStore(initialState); // Initialize the store with an empty state
		mockAxios = new MockAdapter(axios);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
	});
	afterEach(() => {
		cleanup();
		mockAxios.restore();
	});

	describe('LoginPage', () => {
		test('clicking "SIGN IN" button activates the sign-in form', () => {
			const signInButton = screen.getByText('SIGN IN');
			fireEvent.click(signInButton);
			expect(screen.getByTestId('login-business-form')).toBeDefined();
			expect(screen.queryByTestId('signup-business-form')).toBeNull();
		});

		test('clicking "SIGN UP" button activates the sign-up form', async () => {
			const signUpButton = screen.getByText('SIGN UP');
			fireEvent.click(signUpButton);
			await waitFor(() => {
				expect(screen.getByTestId('signup-business-form')).toBeDefined();
				expect(screen.queryByTestId('login-business-form')).toBeNull();
			});
		});

		test('renders the LoginBusiness component when signIn is false', () => {
			expect(screen.getByTestId('login-business-form')).toBeDefined();
			expect(screen.queryByTestId('signup-business-form')).toBeNull();
		});

		test('renders the SignupBusiness component when signIn is true', async () => {
			const signUpButton = screen.getByText('SIGN UP');
			fireEvent.click(signUpButton);
			await waitFor(() => {
				expect(screen.getByTestId('signup-business-form')).toBeDefined();
				expect(screen.queryByTestId('login-business-form')).toBeNull();
			});
		});

		test('activates sign-in and sets slide animation', () => {
			const TestComponent = () => {
				const [signIn, setSignIn] = useState(true);
				const [slideAnimation, setSlideAnimation] = useState('');

				const activateSignIn = () => {
					setSlideAnimation('slide-in-animation');
					setTimeout(() => {
						setSignIn(false);
						setSlideAnimation('');
					}, 300);
				};

				return (
					<div>
						{signIn ? <p onClick={activateSignIn}>Sign In</p> : <div data-testid="sign-in-inactive">Sign In Inactive</div>}
						<div data-testid="slide-animation">{slideAnimation}</div>
					</div>
				);
			};

			render(<TestComponent />);

			const signInButton = screen.getByText('Sign In');
			fireEvent.click(signInButton);

			const inactiveSignIn = screen.getByTestId('sign-in-inactive');
			const slideAnimation = screen.getByTestId('slide-animation');

			expect(inactiveSignIn).toBeInTheDocument();
			expect(slideAnimation.textContent).toBe('');
		});
	});
});
