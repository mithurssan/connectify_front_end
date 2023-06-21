import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NotAssignedBusiness from "."

describe("Not Assigned Page", () => {
    it('renders the not assigned message', () => {
        render(<NotAssignedBusiness />);
        const message = screen.getByText(
            'You have not been assigned to a business yet, while you wait check out some of our other features!'
        );
        expect(message).toBeInTheDocument();
    });
})
