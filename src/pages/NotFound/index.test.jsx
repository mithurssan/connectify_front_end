import React from "react";
import { getByRole, getByTestId, render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import NotFound from ".";

describe("NotFound", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });


  it("renders the page heading", () => {
    const heading = screen.getByText(/404 - Page Not Found/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders the page message", () => {
    const message = screen.getByText(/Sorry, the page you're looking for does not exist./i);
    expect(message).toBeInTheDocument();
  });

  it("renders the Go Back to Main Page button with correct link", () => {
    const goBackButton = screen.getByRole("link", { name: /Go Back to Main Page/i });
    expect(goBackButton).toBeInTheDocument();
    expect(goBackButton.getAttribute("href")).toBe("/");
  });
  
  it("renders the Go Back button with correct functionality", () => {
    const goBackButton = screen.getByRole("button", { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();

    fireEvent.click(goBackButton);

    expect(window.history.length).toBe(1);
    expect(window.location.pathname).toBe("/");
  });
});

