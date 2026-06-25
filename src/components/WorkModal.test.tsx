import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WorkModal } from "./WorkModal";
import { works } from "../data/works";

describe("WorkModal", () => {
  it("renders nothing when work is null", () => {
    const { container } = render(<WorkModal work={null} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the work's title and description when a work is given", () => {
    render(<WorkModal work={works[0]} onClose={vi.fn()} />);
    expect(screen.getByText(works[0].title)).toBeInTheDocument();
    expect(screen.getByText(works[0].description)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<WorkModal work={works[0]} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
