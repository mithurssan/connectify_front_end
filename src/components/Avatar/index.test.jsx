import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Avatar from '.';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

expect.extend(matchers);

const axiosMock = new MockAdapter(axios);
axiosMock.onPatch('http://127.0.0.1:5000/users/update/business/JohnDoe').reply(200, { data: 'mocked response' });

describe('Avatar', () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Avatar />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
    axiosMock.reset();
  });

  it('displays the default profile image', () => {
    // Assert that the default profile image is displayed
    const profileImage = screen.getByAltText('Your Image');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage.getAttribute('src')).toContain('social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpeg');
  });

  it('opens the modal when the profile image is clicked', () => {
    // Click the profile image
    const profileImage = screen.getByAltText('Your Image');
    fireEvent.click(profileImage);

    // Assert that the modal is displayed
    const modalTitle = screen.getByText('Select Your Favourite Profile Image');
    expect(modalTitle).toBeInTheDocument();
  });

  it('selects a new profile image when an avatar is clicked', () => {
    // Click the profile image to open the modal
    const profileImage = screen.getByAltText('Your Image');
    fireEvent.click(profileImage);

    // Click the first avatar
    const avatarImage = screen.getByAltText('Image 1');
    fireEvent.click(avatarImage);

    // Assert that the selected avatar is displayed as the new profile image
    const newProfileImage = screen.getByAltText('Your Image');
    expect(newProfileImage.getAttribute('src')).toContain('image (8).png');
  });
  it('initially sets the showModal state to false', () => {
    // Assert that the initial state of showModal is false
    const initialShowModalState = false;
    expect(screen.getByAltText('Your Image')).toBeInTheDocument();
    expect(screen.queryByText('Select Your Favourite Profile Image')).not.toBeInTheDocument();
  });
  
  
});

