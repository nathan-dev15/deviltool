import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { encode } from "js-base64";
import { TextBase64Tool } from "../pages/EDTools/TextBase64Tool";

describe("TextBase64Tool", () => {
  const renderComponent = () =>
    render(
      <HelmetProvider>
        <MemoryRouter>
          <TextBase64Tool />
        </MemoryRouter>
      </HelmetProvider>
    );

  it("encodes and decodes unicode text", () => {
    renderComponent();

    const source = "Hello \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD";
    const encoded = encode(source);

    fireEvent.change(screen.getByPlaceholderText("Paste text here..."), {
      target: { value: source },
    });

    expect(screen.getByDisplayValue(encoded)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Decode Base64" }));
    fireEvent.change(screen.getByPlaceholderText("Paste Base64 string here..."), {
      target: { value: encoded },
    });

    expect(screen.getByDisplayValue(source)).toBeInTheDocument();
  });

  it("clears stale output and stale errors during invalid decode flows", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Decode Base64" }));

    const input = screen.getByPlaceholderText("Paste Base64 string here...");

    fireEvent.change(input, { target: { value: "SGVsbG8=" } });
    expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "$$$" } });
    expect(screen.queryByDisplayValue("Hello")).not.toBeInTheDocument();
    expect(screen.getByText("Invalid input for decode")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "" } });
    expect(screen.queryByText("Invalid input for decode")).not.toBeInTheDocument();
  });
});
