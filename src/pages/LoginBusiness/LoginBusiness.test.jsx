import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import LoginBusiness from '../LoginBusiness/index'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { describe, test, vi, beforeAll, afterAll, expect } from 'vitest'
import { useSelector } from 'react-redux'

describe('LoginBusiness page', () => {
  let mockAxios

  beforeAll(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterAll(() => {
    mockAxios.restore()
  })

  const initialState = {
    business: {
      companyName: '',
    },
  }

  const mockStore = configureStore()
  let store

  test('renders the login form', () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginBusiness />
        </MemoryRouter>
      </Provider>
    )
    const businessNameInput = screen.getByLabelText('Business name:')
    const passwordInput = screen.getByLabelText('Password:')
    const loginButton = screen.getByText('Login')

    expect(businessNameInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    expect(loginButton).toBeDefined()
  })
  // test('shows error for correct credentials', async () => {
  //   vi.spyOn(axios, 'post').mockRejectedValueOnce({ response: { status: 200 } })

  //   store = mockStore(initialState)
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <LoginBusiness />
  //       </MemoryRouter>
  //     </Provider>
  //   )

  //   const businessNameInput = screen.getByLabelText('Business name:')
  //   const passwordInput = screen.getByLabelText('Password:')
  //   const loginButton = screen.getByText('Login')

  //   fireEvent.change(businessNameInput, { target: { value: 'testbusiness' } })
  //   fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
  //   fireEvent.click(loginButton)

  //   // Set isLoaded to true to show the spinner
  //   await waitFor(() => {
  //     const [, dispatch] = useStateValue()
  //     dispatch(setIsLoaded(true))
  //   })
  //   expect(screen.getByTestId('spinner')).toBeDefined()
  // })

  test('shows error message for correct credentials', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginBusiness />
        </MemoryRouter>
      </Provider>
    )

    // Fill in the login form with correct credentials
    fireEvent.change(screen.getByLabelText('Business name:'), {
      target: { value: 'example' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password' },
    })

    // Submit the form
    fireEvent.click(screen.getByText('Login'))

    // Wait for the spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeNull()
    })

    // Check if the error message is displayed
    expect(screen.getByText('Please Enter Your Details')).toBeDefined()
  })
  test('LoginBusiness page shows error for incorrect credentials', async () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginBusiness />
        </MemoryRouter>
      </Provider>
    )

    const usernameInput = screen.getByLabelText('Business name:')
    const passwordInput = screen.getByLabelText('Password:')
    const loginButton = screen.getByText('Login')

    fireEvent.change(usernameInput, { target: { value: 'incorrectUsername' } })
    fireEvent.change(passwordInput, { target: { value: 'incorrectPassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText('Please Enter Your Details')).toBeDefined()
    })
  })

  test('shows error when businessName is empty', async () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginBusiness />
        </MemoryRouter>
      </Provider>
    )
    const passwordInput = screen.getByLabelText('Password:')
    const loginButton = screen.getByText('Login')

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const errorMessage = screen.getByText('Please Enter Your Details')
      expect(errorMessage).toBeDefined()
    })
  })

  test('shows error when password is empty', async () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginBusiness />
        </MemoryRouter>
      </Provider>
    )
    const businessNameInput = screen.getByLabelText('Business name:')
    const loginButton = screen.getByText('Login')

    fireEvent.change(businessNameInput, { target: { value: 'testbusiness' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const errorMessage = screen.getByText('Please Enter Your Details')
      expect(errorMessage).toBeDefined()
    })
  })
})
