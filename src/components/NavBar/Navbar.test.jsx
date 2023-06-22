import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { Home } from '../../pages'

import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Navbar from '.'
import { SidebarData } from '../SidebarData'

import matchers from '@testing-library/jest-dom/matchers'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

expect.extend(matchers)

describe('Navbar component', () => {
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore({}) // Initialize the store with an empty state
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar SidebarData={SidebarData} />
        </MemoryRouter>
      </Provider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  it('should display the title and icon', () => {
    SidebarData.forEach(({ title }) => {
      const sideBarTitle = screen.getAllByText(title)[0]
      expect(sideBarTitle).toBeInTheDocument()

      const sideBarIcon = screen.getAllByRole('icon')[0]
      expect(sideBarIcon).toBeInTheDocument()
    })
  })

  it('should render 5 navbar links', () => {
    const navLinks = screen.getAllByRole('navbar')
    expect(navLinks).toHaveLength(5)
  })

  it('should toggle the sidebar when the menu icon is clicked', () => {
    const menu = screen.getByRole('menu')
    userEvent.click(menu)

    let sidebar = screen.getByRole('sidebar')
    expect(sidebar).toBeInTheDocument()
  })

  it('logs out and navigates to homepage', async () => {
    const removeItemSpy = vi.spyOn(localStorage, 'removeItem')
    const postMock = vi.spyOn(axios, 'post').mockResolvedValueOnce()

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Navbar SidebarData={SidebarData} />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    const logoutButton = screen.getAllByTestId('logout-button')[0]
    userEvent.click(logoutButton)

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith('https://connectify-server-b31a.onrender.com/logout')
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    removeItemSpy.mockRestore()
    postMock.mockRestore()
  })
})
