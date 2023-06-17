import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import LoginUser from '.'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

describe('LoginUser page', () => {
  let mockAxios

  beforeAll(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterAll(() => {
    mockAxios.restore()
  })

  const initialState = {
    user: {
      username: '',
      password: '',
    },
  }

  const mockStore = configureStore()
  let store

  test('renders the login form', () => {
    store = mockStore(initialState) // Initialize store before rendering
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      </Provider>
    )

    const usernameInput = screen.getByLabelText('Username:')
    const passwordInput = screen.getByLabelText('Password:')
    const loginButton = screen.getByText('Login')

    expect(usernameInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    expect(loginButton).toBeDefined()
  })

  test('shows error message for correct credentials', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Username:'), {
      target: { value: 'example' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByText('Login'))
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).to.be.null
    })
    expect(screen.getByText('Details not recognised')).to.exist
  })

  // test('submits the form with correct credentials', async () => {
  //   store = mockStore(initialState) // Initialize store
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <LoginUser />
  //       </MemoryRouter>
  //     </Provider>
  //   )

  //   const usernameInput = screen.getByLabelText('Username:')
  //   const passwordInput = screen.getByLabelText('Password:')
  //   const loginButton = screen.getByText('Login')

  //   const url = 'http://127.0.0.1:5000/users/login'
  //   const expectedOptions = {
  //     user_username: 'testuser',
  //     user_password: 'testpassword',
  //   }

  //   mockAxios.onPost(url, expectedOptions).reply(200)

  //   fireEvent.change(usernameInput, { target: { value: 'testuser' } })
  //   fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
  //   fireEvent.click(loginButton)

  //   await waitFor(() => {
  //     expect(screen.getByTestId('spinner')).toBeDefined()
  //   })

  //   expect(mockAxios.history.post.length).toBe(1)
  //   expect(mockAxios.history.post[0].url).toBe(url)
  //   expect(mockAxios.history.post[0].data).toEqual(
  //     JSON.stringify(expectedOptions)
  //   )
  // })

  test('shows error for incorrect credentials', async () => {
    vi.spyOn(axios, 'post').mockRejectedValueOnce({ response: { status: 401 } })

    store = mockStore(initialState) // Initialize store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      </Provider>
    )

    const usernameInput = screen.getByLabelText('Username:')
    const passwordInput = screen.getByLabelText('Password:')
    const loginButton = screen.getByText('Login')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText('Please Enter Your Details')).toBeDefined()
    })
  })

  test('shows error when username is empty', async () => {
    store = mockStore(initialState) // Initialize store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      </Provider>
    )

    const passwordInput = screen.getAllByLabelText('Password:')[0]
    const loginButton = screen.getAllByText('Login')[0]

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const errorMessage = screen.getByText('Please Enter Your Details')
      expect(errorMessage).toBeDefined()
    })
  })

  test('shows error when password is empty', async () => {
    store = mockStore(initialState) // Initialize store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      </Provider>
    )

    const usernameInput = screen.getAllByLabelText('Username:')[0]
    const loginButton = screen.getAllByText('Login')[0]

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const errorMessage = screen.getByText('Please Enter Your Details')
      expect(errorMessage).toBeDefined()
    })
  })
})
