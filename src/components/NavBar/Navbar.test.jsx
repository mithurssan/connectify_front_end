import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Navbar from '.';
import { SidebarData } from '../SidebarData';

import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
expect.extend(matchers);

describe('Navbar component', () => {
	it('should display the title and icon', () => {
		for (let i = 0; i < SidebarData.length; i++) {
			const { title, icon } = SidebarData[i];
			render(
				<MemoryRouter path="/">
					<Navbar title={title} icon={icon} />
				</MemoryRouter>
			);

			const sideBarTitle = screen.getAllByText(title)[0];
			expect(sideBarTitle).toBeInTheDocument();

			const sideBarIcon = screen.getAllByRole('icon')[0];
			expect(sideBarIcon).toBeInTheDocument();
		}
	});

	it('should render 5 navbar links', () => {
		render(
			<MemoryRouter path="/">
				<Navbar SidebarData={SidebarData} />
			</MemoryRouter>
		);

		const nav = screen.getAllByRole('navbar');
		expect(nav).toHaveLength(5);
	});
	it('should render the nav links when the menu is clicked', () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		const menu = screen.getByRole('menu');
		userEvent.click(menu);

		const navbarLinks = screen.getByRole('nav');
		expect(navbarLinks).toBeInTheDocument();
	});
});
