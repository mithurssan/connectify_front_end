import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import axios from 'axios'
import SignupUser from '.'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('SignupUser page', () => {
  const initialState = {
    user: {
      username: '',
      email: '',
      password: '',
    },
  }

  const mockStore = configureStore()
  let store

  test('renders the SignupUser component', () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupUser />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByLabelText('Username:')).toBeDefined()
    expect(screen.getByLabelText('Email:')).toBeDefined()
    expect(screen.getByLabelText('Password:')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Register' })).toBeDefined()
  })
  test('submits the form with correct credentials', async () => {
    const axiosPostSpy = vi
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ status: 200 })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupUser />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Username:'), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'testpassword' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    expect(axiosPostSpy).toHaveBeenCalledWith(
      'https://connectify-server-b31a.onrender.com/users/register',
      {
        user_username: 'testuser',
        user_email: 'test@example.com',
        user_password: 'testpassword',
      }
    )

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeDefined()
    })

    axiosPostSpy.mockRestore()
  })

  test('throws error when nothing is submitted', async () => {
    const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 400,
      data: { message: 'Error occurred' },
    })

    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupUser />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Username:'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    expect(
      screen.getByRole('heading', { name: 'Please Enter Your Details' })
    ).toBeDefined()

    axiosPostSpy.mockRestore()
  })

  // test('handles error in form submission', async () => {
  //   const errorMessage = 'Error occurred during registration'
  //   const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation()
  //   vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error(errorMessage))
  //   store = mockStore(initialState)
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <SignupUser />
  //       </MemoryRouter>
  //     </Provider>
  //   )

  //   fireEvent.change(screen.getByLabelText('Username:'), {
  //     target: { value: 'testuser' },
  //   })
  //   fireEvent.change(screen.getByLabelText('Email:'), {
  //     target: { value: 'test@example.com' },
  //   })
  //   fireEvent.change(screen.getByLabelText('Password:'), {
  //     target: { value: 'testpassword' },
  //   })

  //   fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0])

  //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))

  //   consoleErrorSpy.mockRestore()
  // })
})
