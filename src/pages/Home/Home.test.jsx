import React from "react";
import { getByRole, getByTestId,render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Home from ".";

describe("Home", () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });
  
    afterEach(() => {
      cleanup();
    });

    
    it("renders the page heading", () => {
      const heading = screen.getByRole('heading', { name: /Connectify/i });
      expect(heading).toBeInTheDocument();
    });

    it("renders the image", () => {
        const image = screen.getByAltText("Group of employees");
        expect(image).toBeInTheDocument();
      });
      it("renders the image", () => {
        const image = screen.getByAltText("Female CEO");
        expect(image).toBeInTheDocument();
      });
      it("renders the image", () => {
        const image = screen.getByAltText("phone with apps floating around it");
        expect(image).toBeInTheDocument();
      });
      it("renders the image", () => {
        const image = screen.getByAltText("laptop");
        expect(image).toBeInTheDocument();
      });



});


