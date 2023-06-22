import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Profile from '.';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

expect.extend(matchers);

const axiosMock = new MockAdapter(axios);
axiosMock.onPatch('https://connectify-server-b31a.onrender.com/users/update/USER_ID').reply(201, {});
axiosMock.onDelete('https://connectify-server-b31a.onrender.com/users/delete/USER_ID').reply(200, {});

describe('Profile', () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        username: 'testuser',
        email: 'testemail@example.com',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
    axiosMock.reset();
  });

  it('should render the component', () => {
    expect(screen.getByText('Edit Your Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should display an error message when required fields are empty', () => {
  fireEvent.click(screen.getByText('Update My Profile'));
  expect(screen.getByText('Please enter your profile')).toBeInTheDocument();
});

  it('should update user profile', async () => {
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'newusername' } });
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

    fireEvent.click(screen.getByText('Update My Profile'));

    await waitFor(() => {
      expect(axiosMock.history.patch.length).toBe(1);
      expect(axiosMock.history.patch[0].data).toBe(JSON.stringify({
        user_username: 'newusername',
        user_email: 'newemail@example.com',
        user_password: 'newpassword',
      }));
    });
  });

  it('should delete user profile', async () => {
    fireEvent.click(screen.getByText('Delete Account'));

    await waitFor(() => {
      expect(axiosMock.history.delete.length).toBe(1);
      expect(axiosMock.history.delete[0].url).toBe('https://connectify-server-b31a.onrender.com/users/delete/USER_ID');
      expect(window.location.href).toBe('/');
    });
  });
  it('should display an error message when profile update fails', async () => {
    axiosMock.onPatch('https://connectify-server-b31a.onrender.com/users/update/USER_ID').reply(500, {});
  
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
  
    fireEvent.change(usernameInput, { target: { value: 'newusername' } });
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
  
    fireEvent.click(screen.getByText('Update My Profile'));
  
    await waitFor(() => {
      expect(screen.getByText('There was a problem in updating your profile.')).toBeInTheDocument();
    });
  });
  it('should display an error message when profile deletion fails', async () => {
    axiosMock.onDelete('https://connectify-server-b31a.onrender.com/users/delete/USER_ID').reply(500, {});
  
    fireEvent.click(screen.getByText('Delete Account'));
  
    await waitFor(() => {
      expect(screen.getByText('There was a problem in deleting your profile.')).toBeInTheDocument();
    });
  });
    
});

