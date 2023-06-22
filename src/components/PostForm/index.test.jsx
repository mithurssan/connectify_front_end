import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import PostForm from '.';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

expect.extend(matchers);

const axiosMock = new MockAdapter(axios);
axiosMock.onPatch('https://connectify-server-b31a.onrender.com/users/update/business/JohnDoe').reply(200, { data: 'mocked response' });

describe('PostForm', () => {
    const mockStore = configureStore();
    let store;
  
    beforeEach(() => {
        store = mockStore({
            user: { username: 'testUser' }, // Add the necessary state properties
            business: { companyName: 'testCompany' }, // Add the necessary state properties
          });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PostForm />
          </MemoryRouter>
        </Provider>
      );
    });
  
    afterEach(() => {
      cleanup();
      axiosMock.reset();
    });
    it('should open the dialog on button click', () => {
        fireEvent.click(screen.getByText('Create Post'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    
      it('should close the dialog on cancel button click', () => {
        fireEvent.click(screen.getByText('Create Post'));
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    
      
    }); 
