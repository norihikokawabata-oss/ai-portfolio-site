import { useState } from "react";
import type { Work } from "../data/works";
import { filterWorks, type WorksTab } from "../utils/filterWorks";
import { WorkCard } from "./WorkCard";

interface WorksGalleryProps {
  works: Work[];
  onSelect: (work: Work) => void;
}

const TABS: { value: WorksTab; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "business", label: "業務アプリ・成果物" },
  { value: "knowhow", label: "Claude Code 開発ノウハウ" },
];

export function WorksGallery({ works, onSelect }: WorksGalleryProps) {
  const [tab, setTab] = useState<WorksTab>("all");
  const visibleWorks = filterWorks(works, tab);

  return (
    <section>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            style={{
              borderRadius: "14px",
              padding: "6px 14px",
              border: "none",
              cursor: "pointer",
              background: tab === t.value ? "var(--color-accent-soft)" : "var(--color-surface)",
              color: tab === t.value ? "var(--color-text-heading)" : "var(--color-text-muted)",
              fontWeight: tab === t.value ? "bold" : "normal",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {visibleWorks.map((work) => (
          <div key={work.id} style={{ height: "140px" }}>
            <WorkCard work={work} onSelect={onSelect} variant="grid" />
          </div>
        ))}
      </div>
    </section>
  );
}
