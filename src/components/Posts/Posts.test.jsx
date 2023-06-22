import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import Posts from '.';

describe('Posts Component', () => {
    let mockAxios;
    const mockStore = configureStore()
    let store

    const initialState = {
        user: {
            username: '',
            password: '',
        },
    }

    beforeEach(() => {
        store = mockStore(initialState)
        mockAxios = new MockAdapter(axios);
        const postsData = [
            {
                post_id: 1,
                post_title: 'Post 1',
                post_content: 'Content 1',
                username: 'User 1',
                post_upvotes: 1,
            },
        ];
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Posts posts={postsData} setPosts={() => { }} />
                </MemoryRouter>
            </Provider>
        );
    });

    afterEach(() => {
        mockAxios.restore();
    });

    it('displays posts correctly', async () => {
        const postsData = [
            {
                post_id: 2,
                post_title: 'Post 2',
                post_content: 'Content 2',
                username: 'User 2',
                post_upvotes: 5,
            },
            {
                post_id: 3,
                post_title: 'Post 3',
                post_content: 'Content 3',
                username: 'User 3',
                post_upvotes: 10,
            },
        ];

        mockAxios.onGet('https://connectify-server-b31a.onrender.com/posts').reply(200, postsData);

        render(<Posts posts={postsData} setPosts={() => { }} />);

        expect(screen.getByText('Post 2')).toBeInTheDocument();
        expect(screen.getByText('Post 3')).toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.getByText('Content 3')).toBeInTheDocument();
        expect(screen.getByText('User 2')).toBeInTheDocument();
        expect(screen.getByText('User 3')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('opens comment dialog when comment button is clicked', () => {
        fireEvent.click(screen.getByRole('comments-btn'));
        expect(screen.getByRole('dialog-container')).toBeVisible();
    });


    it('handles upvote correctly', async () => {
        const initialUpvotes = parseInt(screen.getByRole("num-upvotes").textContent);
        await waitFor(() => {
            fireEvent.click(screen.getByRole("upvote-button"));
        });

        const updatedUpvotes = parseInt(screen.getByRole("num-upvotes").textContent);
        expect(updatedUpvotes).toBe(initialUpvotes + 1);
    });
});
