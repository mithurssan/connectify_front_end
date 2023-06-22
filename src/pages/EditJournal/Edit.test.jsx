import React from 'react'
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import EditJournal from '.'

describe('EditJournal', () => {
  let mockAxios

  beforeAll(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })
  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <EditJournal />
      </MemoryRouter>
    )

    const dateInput = screen.getByLabelText('Date')
    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')
    const saveButton = screen.getByText('Save')
    const viewAll = screen.getByText('View my entries')

    expect(dateInput).toBeDefined()
    expect(titleInput).toBeDefined()
    expect(contentInput).toBeDefined()
    expect(saveButton).toBeDefined()
    expect(viewAll).toBeDefined()
  })

  it('updates state when input fields change', () => {
    render(
      <MemoryRouter>
        <EditJournal />
      </MemoryRouter>
    )

    const dateInput = screen.getByLabelText('Date')
    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')

    fireEvent.change(dateInput, { target: { value: '2023-06-22' } })
    fireEvent.change(titleInput, { target: { value: 'Testing React App' } })
    fireEvent.change(contentInput, {
      target: { value: 'This is a test entry.' },
    })

    expect(dateInput.value).toBe('2023-06-22')
    expect(titleInput.value).toBe('Testing React App')
    expect(contentInput.value).toBe('This is a test entry.')
  })

  it('submits the form and updates state on successful API response', async () => {
    mockAxios
      .onPut('https://connectify-server-b31a.onrender.com/entries/update/123')
      .reply(200, { message: 'Entry updated successfully' })

    render(
      <MemoryRouter>
        <EditJournal />
      </MemoryRouter>
    )

    const dateInput = screen.getByLabelText('Date')
    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')
    const saveButton = screen.getByText('Save')

    fireEvent.change(dateInput, { target: { value: '2023-06-22' } })
    fireEvent.change(titleInput, { target: { value: 'Testing React App' } })
    fireEvent.change(contentInput, {
      target: { value: 'This is a test entry.' },
    })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1)
      expect(mockAxios.history.put[0].data).toBe(
        JSON.stringify({
          user_id: '',
          entry_date: '2023-06-22',
          entry_title: 'Testing React App',
          entry_content: 'This is a test entry.',
        })
      )

      const successMessage = screen.queryByText('Entry updated successfully', {
        selector: 'p',
      })

      expect(successMessage).toBeDefined()
    })
  })
})
