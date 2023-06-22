import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor, findByText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import AddJournal from '.';

describe('AddJournal', () => {
	let mockAxios;

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);

		render(
			<BrowserRouter>
				<AddJournal />
			</BrowserRouter>
		);
	});

	afterEach(() => {
		cleanup();
		mockAxios.restore();
	});

	test('renders the form correctly', () => {
		const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	test('adds a new journal entry', async () => {
		mockAxios
			.onPost(
				'http://127.0.0.1:5000/entries/add',
				{
					user_id: '1',
					entry_date: '2023-06-21',
					entry_title: 'My Journal Entry',
					entry_content: 'This is my journal content',
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			.reply(200);
	});
	test('displays an error message if entry is not complete', async () => {
    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your entry')).toBeInTheDocument();
    });
  });

  test('navigates to the journal list page when "View my entries" button is clicked', () => {
    const viewEntriesButton = screen.getByText('View my entries');
    fireEvent.click(viewEntriesButton);
  });
  
});
