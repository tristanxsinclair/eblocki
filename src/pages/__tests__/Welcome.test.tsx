import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Welcome from "@/pages/Welcome";

vi.mock("@/lib/eblocki/analytics", () => ({ logEvent: vi.fn() }));

describe("first-use welcome", () => {
  it("moves from a plain-language loop to an academic focus and the first artifact", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Turn one piece of work/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    expect(screen.getByRole("heading", { name: /What kind of work/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Law/i }));
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    expect(screen.getByRole("heading", { name: /first useful result/i })).toBeInTheDocument();
    expect(screen.getByText(/Start the correction and submit the stronger attempt/i)).toBeInTheDocument();
  });
});
