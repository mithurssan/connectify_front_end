import { render, cleanup, screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Spinner from '.'
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'

describe('Spinner', () => {
  beforeEach(() => {
    render(<Spinner />)
  })
  afterEach(() => {
    cleanup()
  })

  it('should have spinner', () => {
    const spinner = screen.getByTestId('spinner-container')
    expect(spinner).toBeDefined()
  })
})
