import React from "react";
import { getByRole, getByTestId,render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Wellbeing from ".";

describe("Wellbeing", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Wellbeing />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the page heading", () => {
    const heading = screen.getByRole('heading', { name: /mental health/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the page description", () => {
    const pageDescription = screen.getByText(
      "Your well-being is important! Strive for a healthy balance between work, personal life, and leisure activities."
    );
    expect(pageDescription).toBeInTheDocument();
  });

  it("renders the image", () => {
    const image = screen.getByAltText("Importance of mental health");
    expect(image).toBeInTheDocument();
  });

  it("renders the Journal box with link", () => {
    const journalBox = screen.getByText("Journal");
    const journalImage = screen.getByAltText("Journal");
    expect(journalBox).toBeInTheDocument();
    expect(journalImage).toBeInTheDocument();
  });

  it("renders the Chat box with link", () => {
    const chatBox = screen.getByText("Chat with the therapist");
    const chatImage = screen.getByAltText("Chat with the therapist");
    expect(chatBox).toBeInTheDocument();
    expect(chatImage).toBeInTheDocument();
  });

  it("renders the Blogs box with link", () => {
    const blogsBoxes = screen.getAllByText("Blogs");
    const blogsImages = screen.getAllByAltText("Blogs");
    expect(blogsBoxes.length).toBe(1);
    expect(blogsImages.length).toBe(1);
  });
});



