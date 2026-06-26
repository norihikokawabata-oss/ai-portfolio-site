export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-inner">
        <div className="contact-box">
          <div>
            <h2 className="contact-title">
              お仕事・
              <br />
              コラボのご相談
            </h2>
            <p className="contact-lead">
              AIを活用したプロダクト開発、ツール制作についてお気軽にどうぞ。
              <br />
              まずはメールやGitHubでご連絡ください。
            </p>
          </div>
          <div className="contact-links">
            <a href="mailto:norihikokawabata@gmail.com" className="contact-link">
              <div>
                <div className="label">EMAIL</div>
                <div className="value">norihikokawabata@gmail.com</div>
              </div>
            </a>
            <a
              href="https://github.com/norihikokawabata-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <div>
                <div className="label">GITHUB</div>
                <div className="value">norihikokawabata-oss</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
