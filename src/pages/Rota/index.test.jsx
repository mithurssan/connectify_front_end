import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import Rota from '.';

describe('Rota', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    render(
      <BrowserRouter>
        <Rota />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
    mockAxios.restore();
  });

  it('renders the calendar', () => {
    const calendar = screen.getByRole('table', { name: 'Month View' });
    expect(calendar).toBeInTheDocument();
  });

  it('updates an event when it is dropped', async () => {
    const event = {
      rota_id: 1,
      business_id: 1,
      rota_start_date: '16-06-2023',
      rota_end_date: '20-06-2023',
      rota_content: 'Assigned to user: test1',
    };

    mockAxios.onPut(`http://127.0.0.1:5000/rotas/${event.rota_id}`).reply(200);

  });

  it('handles error when fetching events', async () => {
    mockAxios.onGet('http://127.0.0.1:5000/rotas/').reply(500);

    await expect(screen.findByText('Assigned to user: test1')).rejects.toThrow();

    
  });

  it('handles error when updating an event', async () => {
    const event = {
      rota_id: 1,
      business_id: 1,
      rota_start_date: '16-06-2023',
      rota_end_date: '20-06-2023',
      rota_content: 'Assigned to user: test1',
    };

    mockAxios.onPut(`http://127.0.0.1:5000/rotas/${event.rota_id}`).reply(500);

  });

});



