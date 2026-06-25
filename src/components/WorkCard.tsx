import type { Work } from "../data/works";

interface WorkCardProps {
  work: Work;
  onSelect: (work: Work) => void;
  variant?: "hero-main" | "hero-sub" | "grid";
}

export function WorkCard({ work, onSelect, variant = "grid" }: WorkCardProps) {
  const isHeroMain = variant === "hero-main";
  return (
    <button
      type="button"
      onClick={() => onSelect(work)}
      aria-label={`${work.title}の詳細を開く`}
      style={{
        position: "relative",
        border: isHeroMain ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        padding: 0,
        cursor: "pointer",
        background: "none",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src={work.thumbnail}
        alt={work.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: variant === "grid" ? "var(--color-accent-soft)" : "var(--color-primary)",
          color: "var(--color-on-primary)",
          fontSize: "12px",
          padding: "4px 8px",
          textAlign: "left",
        }}
      >
        {work.title}
      </span>
    </button>
  );
}
