import type { Work, WorkCategory } from "../data/works";

export type WorksTab = "all" | WorkCategory;

export function filterWorks(works: Work[], tab: WorksTab): Work[] {
  if (tab === "all") return works;
  return works.filter((w) => w.category === tab);
}
