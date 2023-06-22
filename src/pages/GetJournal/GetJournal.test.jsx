import React from 'react'
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import GetJournal from '.'
describe('GetJournal', () => {
  const mockAxios = new MockAdapter(axios)

  afterEach(() => {
    mockAxios.reset()
  })

  it('renders loading spinner initially', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <GetJournal />
      </MemoryRouter>
    )
    expect(getByTestId('spinner')).toBeInTheDocument()
  })

  it('displays journal entries after successful API request', async () => {
    const mockJournalData = [
      {
        entry_id: 0,
        entry_date: '2023-06-20',
        entry_title: 'Test Entry',
        entry_content: 'This is a test entry.',
      },
    ]

    mockAxios
      .onGet('https://connectify-server-b31a.onrender.com/entries/user/1')
      .reply(200, mockJournalData)

    render(
      <MemoryRouter>
        <GetJournal />
      </MemoryRouter>
    )

    await screen.findByText('Test Entry')

    expect(screen.getByText('Test Entry')).toBeDefined()
  })

  it('displays error message on failed API request', async () => {
    mockAxios.onGet('https://connectify-server-b31a.onrender.com/entries/user/1').reply(500)

    render(
      <MemoryRouter>
        <GetJournal />
      </MemoryRouter>
    )

    // Wait for the error message to display
    await screen.findByText('Cannot fetch the data', {}, { timeout: 400 })

    expect(screen.getByText('Cannot fetch the data')).toBeDefined()
    expect(screen.queryByTestId('spinner')).toBeNull()
  })

  it('displays "no entry" message when API request returns an empty array', async () => {
    mockAxios.onGet('https://connectify-server-b31a.onrender.com/entries/user/1').reply(200, [])

    render(
      <MemoryRouter>
        <GetJournal />
      </MemoryRouter>
    )

    await screen.findByText(
      'You have no journal entries. Would you like to add one?'
    )

    expect(
      screen.getByText(
        'You have no journal entries. Would you like to add one?'
      )
    ).toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).toBeDefined()
  })

  it('deletes a journal entry on button click', async () => {
    const mockJournalData = [
      {
        entry_id: 1,
        entry_date: '2023-06-20',
        entry_title: 'Test Entry',
        entry_content: 'This is a test entry.',
      },
    ]

    mockAxios
      .onGet('https://connectify-server-b31a.onrender.com/entries/user/1')
      .reply(200, mockJournalData)

    mockAxios.onDelete('https://connectify-server-b31a.onrender.com/entries/delete/1').reply(200)

    render(
      <MemoryRouter>
        <GetJournal />
      </MemoryRouter>
    )

    await screen.findByText('Test Entry')

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockAxios.history.delete.length).toBe(1)
    expect(mockAxios.history.delete[0].url).toBe(
      'https://connectify-server-b31a.onrender.com/entries/delete/1'
    )

    await screen.findByText('Entry has been deleted successfully')

    expect(
      screen.getByText('Entry has been deleted successfully')
    ).toBeInTheDocument()

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })
})
