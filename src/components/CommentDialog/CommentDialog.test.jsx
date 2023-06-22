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
import CommentDialog from '.';

describe('Comment Dialog Component', () => {
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
        localStorage.setItem('business_name', "testBusiness");
        store = mockStore(initialState);
        mockAxios = new MockAdapter(axios);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CommentDialog />
                </MemoryRouter>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        mockAxios.restore();
    });

    it('adds a new comment', async () => {
        const newComment = {
            comment_content: "First Comment",
        };

        mockAxios.onPost('https://connectify-server-b31a.onrender.com/posts/add').reply(200);

        const contentTextarea = screen.getByPlaceholderText('Add a comment...');

        fireEvent.change(contentTextarea, {
            target: { value: newComment.comment_content },
        });

        fireEvent.submit(screen.getByRole('comment-form'));

        const expectedData = {
            comment_content: newComment.comment_content,
            comment_username: "testBusiness",
            user_id: "1",
        };

        const expectedJSON = JSON.stringify(expectedData);
        expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(JSON.parse(expectedJSON));
    });

})
