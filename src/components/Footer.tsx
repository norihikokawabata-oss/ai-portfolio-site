export function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "32px 0",
        marginTop: "48px",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text-muted)",
        fontSize: "14px",
      }}
    >
      <p>
        <a href="mailto:norihikokawabata@gmail.com" style={{ color: "var(--color-primary)" }}>
          norihikokawabata@gmail.com
        </a>
      </p>
      <p>
        <a
          href="https://github.com/norihikokawabata-oss"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-primary)" }}
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
