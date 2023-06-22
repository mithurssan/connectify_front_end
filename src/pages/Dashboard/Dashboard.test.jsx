import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import Dashboard from '.';

describe('Dashboard for Users and Business', () => {
    let mockAxios;
    const mockStore = configureStore();
    let store;

    const initialState = {
        user: {
            username: 'JohnDoe',
        },
        business: {
            companyName: 'BusinessName',
        },
    };

    beforeEach(() => {
        localStorage.setItem('isBusiness', 'true');
        localStorage.setItem("user_id", "1")
        localStorage.setItem("business_id", "1")
        store = mockStore(initialState);
        mockAxios = new MockAdapter(axios);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        mockAxios.restore();

    });

    it('displays welcome message for business', () => {
        store = mockStore({
            ...initialState,
            user: {
                username: '',
            },
            business: {
                companyName: 'BusinessName',
            },
        });
        expect(screen.getByText('Welcome, BusinessName!')).toBeInTheDocument();
    });

    it('displays dashboard icons', () => {
        const icons = screen.getAllByRole('link');
        expect(icons).toHaveLength(4);
    });

    it('displays add user form for business', () => {
        store = mockStore({
            ...initialState,
            user: {
                username: '',
            },
            business: {
                companyName: 'BusinessName',
            },
        });
        expect(screen.getByTestId('add-user-button')).toBeInTheDocument();
    });


    it('displays post form', () => {
        expect(screen.getByRole('post')).toBeInTheDocument();
    });

    it('adds a new post', async () => {
        const newPost = {
            title: 'Test Post',
            content: 'This is a test post.',
        };

        mockAxios.onPost('https://connectify-server-b31a.onrender.com/posts/add').reply(200);

        fireEvent.click(screen.getByRole('create-post-btn'));

        const titleInput = screen.getByPlaceholderText('Title');
        const contentTextarea = screen.getByPlaceholderText('enter post here (1000 characters max)');

        fireEvent.change(titleInput, {
            target: { value: newPost.title },
        });
        fireEvent.change(contentTextarea, {
            target: { value: newPost.content },
        });

        fireEvent.click(screen.getByRole('share-post-btn'));

        const expectedData = {
            user_id: "1",
            business_id: "1",
            username: initialState.business.companyName,
            post_title: newPost.title,
            post_content: newPost.content,
        };
        const expectedJSON = JSON.stringify(expectedData);
        expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(JSON.parse(expectedJSON));
    });
})


describe('Dashboard for Users Only', () => {
    let mockAxios;
    const mockStore = configureStore();
    let store;

    const initialState = {
        user: {
            username: 'JohnDoe',
        },
        business: {
            companyName: 'BusinessName',
        },
    };

    beforeEach(() => {
        localStorage.removeItem('isBusiness');
        store = mockStore(initialState);
        mockAxios = new MockAdapter(axios);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        mockAxios.restore();

    });

    it('displays welcome message for regular user', () => {
        expect(screen.getByText('Welcome, JohnDoe!')).toBeInTheDocument();
    });


    it('does not display add user form for regular user', () => {
        const addUserButton = screen.queryByTestId('add-user-button');
        expect(addUserButton).toBeNull();
    });

});
