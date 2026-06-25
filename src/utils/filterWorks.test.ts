import { describe, it, expect } from "vitest";
import { filterWorks } from "./filterWorks";
import { works } from "../data/works";

describe("filterWorks", () => {
  it('returns all 10 works when tab is "all"', () => {
    expect(filterWorks(works, "all")).toHaveLength(10);
  });

  it('returns only business-category works when tab is "business"', () => {
    const result = filterWorks(works, "business");
    expect(result).toHaveLength(6);
    expect(result.every((w) => w.category === "business")).toBe(true);
  });

  it('returns only knowhow-category works when tab is "knowhow"', () => {
    const result = filterWorks(works, "knowhow");
    expect(result).toHaveLength(4);
    expect(result.every((w) => w.category === "knowhow")).toBe(true);
  });
});
