import { SITE_YEAR } from "../data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <span>© {SITE_YEAR} ばたやん</span>
      <span>
        Built with{" "}
        <a href="https://www.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer">
          Claude Code
        </a>
      </span>
    </footer>
  );
}
