import { act, fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { JsonSortKeysTool } from "../pages/JsonTools/JsonSortKeysTool";

describe("JsonSortKeysTool", () => {
  const renderComponent = () =>
    render(
      <HelmetProvider>
        <MemoryRouter>
          <JsonSortKeysTool />
        </MemoryRouter>
      </HelmetProvider>
    );

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  });

  it("keeps empty input in a clean idle state", () => {
    renderComponent();

    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.queryByText("Invalid JSON format")).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText("Paste your JSON here...");
    fireEvent.change(input, { target: { value: '{"b":1,"a":2}' } });
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getAllByRole("textbox")[1]).toHaveValue('{\n  "a": 2,\n  "b": 1\n}');

    fireEvent.click(screen.getByRole("button", { name: /Clear/i }));
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText("Invalid JSON format")).not.toBeInTheDocument();
  });

  it("sorts nested JSON keys alphabetically", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Paste your JSON here...");
    fireEvent.change(input, {
      target: {
        value: '{"z":1,"a":{"d":4,"b":2},"items":[{"y":2,"x":1}]}',
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sort/i }));

    expect(screen.getAllByRole("textbox")[1]).toHaveValue(
      '{\n  "a": {\n    "b": 2,\n    "d": 4\n  },\n  "items": [\n    {\n      "x": 1,\n      "y": 2\n    }\n  ],\n  "z": 1\n}'
    );
  });
});
