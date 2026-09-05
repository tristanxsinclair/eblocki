import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Landing from "@/pages/Landing";

vi.mock("@/lib/eblocki/analytics", () => ({ logEvent: vi.fn() }));

describe("public Eblocki system", () => {
  it("shows the life game, the evidence loop, and the full operating system", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Turned into a game you can prove.");
    expect(screen.getByText("A learning path with consequences.")).toBeInTheDocument();
    expect(screen.getByText("More than a proof form. Your operating system.")).toBeInTheDocument();
    expect(screen.getByText("An IRAC answer from a tutorial or past paper")).toBeInTheDocument();
    expect(screen.getByText("One route through the day")).toBeInTheDocument();
    expect(screen.getByText("Train before it counts")).toBeInTheDocument();
    expect(screen.getByText("A capability profile you earn")).toBeInTheDocument();
    expect(screen.getByText("A Sink Space product")).toBeInTheDocument();
    expect(screen.getByText("The game cannot award itself.")).toBeInTheDocument();
  });
});
