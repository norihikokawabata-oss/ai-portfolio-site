import type { Work } from "../data/works";

interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
}

export function WorkModal({ work, onClose }: WorkModalProps) {
  if (!work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31, 42, 68, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg)",
          borderRadius: "var(--radius-md)",
          maxWidth: "560px",
          width: "90%",
          padding: "24px",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <img
          src={work.thumbnail}
          alt={work.title}
          style={{ width: "100%", borderRadius: "var(--radius-md)", marginBottom: "16px" }}
        />
        <h2 style={{ color: "var(--color-text-heading)", marginBottom: "8px" }}>{work.title}</h2>
        <p style={{ color: "var(--color-text-body)" }}>{work.description}</p>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "16px",
            background: "var(--color-primary)",
            color: "var(--color-on-primary)",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
