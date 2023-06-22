import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import SignupBusiness from '.'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('SignupBusiness page', () => {
  const initialState = {
    business: {
      companyName: '',
      companyNumber: '',
      companyPassword: '',
    },
  }

  const mockStore = configureStore()
  let store

  test('renders the SignupBusiness component', () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupBusiness />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByLabelText('Company name:')).toBeDefined()
    expect(screen.getByLabelText('Company number:')).toBeDefined()
    expect(screen.getByLabelText('Email address:')).toBeDefined()
    expect(screen.getByLabelText('Password:')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Register' })).toBeDefined()
  })

  test('submits the form with correct credentials', async () => {
    const mockData = {
      company_name: 'TEST COMPANY',
      company_number: 123456,
    }

    const mockPostResponse = {
      status: 200,
    }

    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData })
    vi.spyOn(axios, 'post').mockResolvedValueOnce(mockPostResponse)

    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupBusiness />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Company name:'), {
      target: { value: 'TEST COMPANY' },
    })
    fireEvent.change(screen.getByLabelText('Company number:'), {
      target: { value: 123456 },
    })
    fireEvent.change(screen.getByLabelText('Email address:'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'testpassword' },
    })

    fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0])

    await waitFor(() => {
      // expect(axios.get).toHaveBeenCalledWith(
      //   'https://connectify-server-b31a.onrender.com/api/company/123456',
      //   mockData
      // )
      expect(axios.post).toHaveBeenCalledWith(
        'https://connectify-server-b31a.onrender.com/businesses/register',
        {
          business_name: 'TEST COMPANY',
          business_number: '123456',
          business_email: 'test@example.com',
          business_password: 'testpassword',
        }
      )
    })
  })

  test('submits the form with incorrect credentials', async () => {
    const mockData = {
      company_name: 'TEST COMPANY',
      company_number: 123456,
    }

    const mockPostResponse = {
      status: 400,
    }

    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData })
    vi.spyOn(axios, 'post').mockRejectedValueOnce(mockPostResponse)

    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupBusiness />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Company name:'), {
      target: { value: 'TEST COMPANY' },
    })
    fireEvent.change(screen.getByLabelText('Company number:'), {
      target: { value: 123456 },
    })
    fireEvent.change(screen.getByLabelText('Email address:'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'testpassword' },
    })

    fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0])

    await waitFor(() => {
      // expect(axios.get).toHaveBeenCalled()
      // expect(axios.get).toHaveBeenCalledWith(
      //   'https://connectify-server-b31a.onrender.com/api/company/123456',
      //   mockData
      // )
      expect(axios.post).toHaveBeenCalledWith(
        'https://connectify-server-b31a.onrender.com/businesses/register',
        {
          business_name: 'TEST COMPANY',
          business_number: '123456',
          business_email: 'test@example.com',
          business_password: 'testpassword',
        }
      )
    })

    expect(screen.getByText('Problem Occured Please Try Again')).to.exist
  })

  test('throws error when nothing is submitted', async () => {
    const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 400,
    })

    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupBusiness />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText('Company name:'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText('Company number:'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText('Email address:'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0])

    expect(
      screen.getByRole('heading', { name: 'Please Enter Your Details' })
    ).toBeDefined()

    axiosPostSpy.mockRestore()
  })
})
