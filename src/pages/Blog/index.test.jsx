import React from 'react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'
import MockAdapter from 'axios-mock-adapter'
import Blog from '.'
import matchers from '@testing-library/jest-dom/matchers'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

expect.extend(matchers)

const axiosMock = new MockAdapter(axios)
axiosMock
  .onPatch('http://127.0.0.1:5000/users/update/business/JohnDoe')
  .reply(200, { data: 'mocked response' })

describe('Blog', () => {
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore({})
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </Provider>
    )
  })

  afterEach(() => {
    cleanup()
    axiosMock.reset()
  })

  it('renders the blog post container', () => {
    const blogPostContainer = screen.getByTestId('blog-post-container')
    expect(blogPostContainer).toBeInTheDocument()
  })

  it('renders the blog details container', () => {
    const blogDetailsContainer = screen.getAllByTestId(
      'blog-details-container'
    )[0]
    expect(blogDetailsContainer).toBeInTheDocument()
  })

  it('displays the blog title and date', () => {
    const blogs = [
      {
        id: 1,
        title: 'Test Blog 1',
        date: '2023-06-20',
        image: 'test-image-1.jpg',
        details: 'This is a test blog 1',
      },
      {
        id: 2,
        title: 'Test Blog 2',
        date: '2023-06-21',
        image: 'test-image-2.jpg',
        details: 'This is a test blog 2',
      },
    ]

    store = mockStore({ blogs })
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </Provider>
    )

    const blogTitles = screen.getAllByTestId('blog-title')
    const blogDates = screen.getAllByTestId('blog-date')

    expect(blogTitles.length).toBe(blogs.length)
    expect(blogDates.length).toBe(blogs.length)

    blogTitles.forEach((blogTitle, index) => {
      expect(blogTitle).toHaveTextContent(blogs[index].title)
    })

    blogDates.forEach((blogDate, index) => {
      expect(blogDate).toHaveTextContent(blogs[index].date)
    })
  })
})
