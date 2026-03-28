import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Home } from "../pages/Home";
import { I18nProvider } from "../i18n/I18nContext";

describe("Smoke", () => {
  it("renders Home without crashing", () => {
    render(
      <MemoryRouter>
        <I18nProvider>
          <Home />
        </I18nProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Free Online Tools/i)).toBeInTheDocument();
  });
});
