import React from 'react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '.'
import { SidebarData } from '../SidebarData'

import matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'

expect.extend(matchers)

describe('Navbar component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar SidebarData={SidebarData} />
      </MemoryRouter>
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

  it('should apply active style to the active link', () => {
    const { path } = SidebarData[0]
    const link = screen.getByRole('link', { name: SidebarData[0].title })

    cleanup()

    render(
      <MemoryRouter initialEntries={[path]}>
        <Navbar SidebarData={SidebarData} />
      </MemoryRouter>
    )

    expect(link).toHaveStyle(`color: #785A9F`)
  })
})
