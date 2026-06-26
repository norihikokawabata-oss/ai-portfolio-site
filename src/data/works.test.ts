import { describe, it, expect } from "vitest";
import { works } from "./works";

describe("works data", () => {
  it("contains exactly 10 works", () => {
    expect(works).toHaveLength(10);
  });

  it("has exactly 6 business-category works and 4 knowhow-category works", () => {
    const business = works.filter((w) => w.category === "business");
    const knowhow = works.filter((w) => w.category === "knowhow");
    expect(business).toHaveLength(6);
    expect(knowhow).toHaveLength(4);
  });

  it("has unique ids", () => {
    const ids = works.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every work has a non-empty title, thumbnail and description", () => {
    for (const w of works) {
      expect(w.title.length).toBeGreaterThan(0);
      expect(w.thumbnail.length).toBeGreaterThan(0);
      expect(w.description.length).toBeGreaterThan(0);
    }
  });

  it("every work has at least one tag", () => {
    for (const w of works) {
      expect(w.tags.length).toBeGreaterThan(0);
    }
  });
});
