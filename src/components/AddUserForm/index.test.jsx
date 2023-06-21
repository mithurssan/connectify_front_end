import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import AddUserForm from '.';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

expect.extend(matchers);

const axiosMock = new MockAdapter(axios);
axiosMock.onPatch('http://127.0.0.1:5000/users/update/business/JohnDoe').reply(200, { data: 'mocked response' });

describe('AddUserForm', () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddUserForm />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
    axiosMock.reset();
  });

  it('should open the dialog on button click', () => {
    fireEvent.click(screen.getByText('Add User'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close the dialog on cancel button click', () => {
    fireEvent.click(screen.getByText('Add User'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });  
 
  it('should display error message on form submission error', async () => {
    axiosMock.onPatch('http://127.0.0.1:5000/users/update/business/JohnDoe').reply(404, { error: 'User not found.' });

    fireEvent.click(screen.getByTestId('add-user-button'));
    const usernameInput = screen.getByPlaceholderText('Username');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('User not found.')).toBeInTheDocument();
      expect(screen.getByText('User not found.')).toHaveClass('message user-error');
    });
  });
});



