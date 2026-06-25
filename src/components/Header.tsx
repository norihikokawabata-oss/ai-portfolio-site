export function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "32px 0 24px",
        borderBottom: "1px solid var(--color-border)",
        marginBottom: "32px",
      }}
    >
      <h1 style={{ color: "var(--color-text-heading)", margin: 0, fontSize: "28px" }}>
        ばたやん
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: "8px" }}>
        Claude Codeで業務AI活用
      </p>
    </header>
  );
}
