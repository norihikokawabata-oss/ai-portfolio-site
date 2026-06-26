export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#hero" className="site-logo">
          ばたやん<span>.</span>
        </a>
        <nav className="site-nav">
          <a href="#about">ABOUT</a>
          <a href="#works">WORKS</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact" className="cta">
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
}
