import heroIllustration from "../assets/hero-illustration.png";

export function Hero() {
  return (
    <section id="hero" className="hero">
      <img src={heroIllustration} alt="" className="hero-bg-illustration" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-label">AI DEVELOPER</div>
        <h1 className="hero-title">
          AIで、
          <br />
          <span className="muted">業務を変える。</span>
        </h1>
        <p className="hero-lead">
          Claude Codeをはじめとする生成AIを活用し、業務アプリ・ツール・ゲームを開発しています。
          アイデアを素早くプロダクトに変えることが得意です。
        </p>
        <div className="hero-actions">
          <a href="#works" className="btn btn-primary">
            WORKSを見る
          </a>
          <a href="#contact" className="btn btn-outline-dark">
            CONTACT
          </a>
        </div>
      </div>
      <img src={heroIllustration} alt="" className="hero-illustration" aria-hidden="true" />
      <div className="hero-watermark">PORTFOLIO</div>
      <div className="scroll-indicator">SCROLL</div>
    </section>
  );
}
