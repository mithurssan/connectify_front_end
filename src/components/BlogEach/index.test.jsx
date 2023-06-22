import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import BlogEach from '.';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

expect.extend(matchers);

describe('BlogEach', () => {
    const mockStore = configureStore();
    let store;
  
    beforeEach(() => {
      store = mockStore({});
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BlogEach />
          </MemoryRouter>
        </Provider>
      );
    });
  
    afterEach(() => {
      cleanup();
      axiosMock.reset();
    });
  
    it('should render the blog details', async () => {
      await waitFor(() => {
        expect(screen.getByText('Example Blog Title')).toBeInTheDocument();
        expect(screen.getByAltText('image-blog-card')).toBeInTheDocument();
        expect(screen.getByText('June 22, 2023')).toBeInTheDocument();
        expect(screen.getByText('Example Heading 1')).toBeInTheDocument();
        expect(screen.getByText('Example Details 1')).toBeInTheDocument();
      });
    });
  
    it('should navigate to the previous blog when the back button is clicked', async () => {
      fireEvent.click(screen.getByTestId('back-button'));
  
      await waitFor(() => {
        expect(screen.getByText('Mocked Previous Blog')).toBeInTheDocument();
      });
    });
  
    it('should navigate to the next blog when the next button is clicked', async () => {
      fireEvent.click(screen.getByTestId('next-button'));
  
      await waitFor(() => {
        expect(screen.getByText('Mocked Next Blog')).toBeInTheDocument();
      });
    });
  
    it('should navigate to the blog list when the "View All Blogs" button is clicked', async () => {
      fireEvent.click(screen.getByTestId('view-all-button'));
  
    
      await waitFor(() => {
        expect(screen.getByText('All Blogs')).toBeInTheDocument();
      });
    });
  });
