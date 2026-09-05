import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Landing from "@/pages/Landing";

vi.mock("@/lib/eblocki/analytics", () => ({ logEvent: vi.fn() }));

describe("public Eblocki explanation", () => {
  it("leads with the academic proof loop and keeps the parent attribution secondary", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Improve from the work you actually produce");
    expect(screen.getByText("Work. Verdict. Gap. Correction.")).toBeInTheDocument();
    expect(screen.getByText("An IRAC answer from a tutorial or past paper")).toBeInTheDocument();
    expect(screen.getByText("A Sink Space product")).toBeInTheDocument();
    expect(screen.queryByText("Your life. Turned into a game.")).not.toBeInTheDocument();
  });
});
