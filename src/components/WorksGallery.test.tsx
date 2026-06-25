import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WorksGallery } from "./WorksGallery";
import { works } from "../data/works";

describe("WorksGallery", () => {
  it("shows all 10 works when the page loads", () => {
    render(<WorksGallery works={works} onSelect={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(10 + 3); // 10カード + 3タブボタン
  });

  it('shows only business works after clicking "業務アプリ・成果物" tab', () => {
    render(<WorksGallery works={works} onSelect={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "業務アプリ・成果物" }));
    const businessCount = works.filter((w) => w.category === "business").length;
    expect(screen.getAllByRole("button")).toHaveLength(businessCount + 3);
  });

  it("calls onSelect with the clicked work", () => {
    const onSelect = vi.fn();
    render(<WorksGallery works={works} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: `${works[0].title}の詳細を開く` }));
    expect(onSelect).toHaveBeenCalledWith(works[0]);
  });
});
