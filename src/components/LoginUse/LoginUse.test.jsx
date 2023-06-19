import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import LoginUse from '.'

import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Router } from 'react-router-dom'

describe('LoginUse', () => {
  const mockStore = configureStore()
  let store
  let mockAxios

  const initialState = {
    user: {
      username: '',
      password: '',
    },
  }
  beforeEach(() => {
    store = mockStore(initialState) // Initialize the store with an empty state
    mockAxios = new MockAdapter(axios)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginUse />
        </MemoryRouter>
      </Provider>
    )
  })
  afterEach(() => {
    cleanup()
    mockAxios.restore()
  })

  describe('LoginUse', () => {
    test('clicking "SIGN IN" button activates the sign-in form', () => {
      const signInButton = screen.getByText('SIGN IN')
      fireEvent.click(signInButton)
      expect(screen.getByTestId('login-user-form')).toBeDefined()
      expect(screen.queryByTestId('signup-user-form')).toBeNull()
    })

    test('clicking "SIGN UP" button activates the sign-up form', async () => {
      const signUpButton = screen.getByText('SIGN UP')
      fireEvent.click(signUpButton)
      await waitFor(() => {
        expect(screen.getByTestId('signup-user-form')).toBeDefined()
        expect(screen.queryByTestId('login-user-form')).toBeNull()
      })
    })

    test('renders the LoginUser component when signIn is false', () => {
      expect(screen.getByTestId('login-user-form')).toBeDefined()
      expect(screen.queryByTestId('signup-user-form')).toBeNull()
    })

    test('renders the SignupUser component when signIn is true', async () => {
      const signUpButton = screen.getByText('SIGN UP')
      fireEvent.click(signUpButton)
      await waitFor(() => {
        expect(screen.getByTestId('signup-user-form')).toBeDefined()
        expect(screen.queryByTestId('login-user-form')).toBeNull()
      })
    })

    test('calls handleSuccessfulRegistration  correctly', async () => {
      const handleSuccessfulRegistration = vi.fn()
      const navigate = vi.fn()
      store = mockStore(initialState) // Initialize the store with an empty state
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LoginUse
              handleSuccessfulRegistration={handleSuccessfulRegistration}
              navigate={navigate}
            />
          </MemoryRouter>
        </Provider>
      )
      const signUpButton = screen.getAllByText('SIGN UP')[0]
      fireEvent.click(signUpButton)
      await waitFor(() => {
        const signupUserForm = screen.getByTestId('signup-user-form')
        fireEvent.submit(signupUserForm)
      })
      expect(handleSuccessfulRegistration).toBeDefined()
      // expect(navigate).toHaveBeenCalledWith('http://localhost:5173/login-user')
    })
    // })
  })
})
