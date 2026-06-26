import { works } from "../data/works";

export function About() {
  const categoryCount = new Set(works.map((w) => w.category)).size;

  return (
    <section id="about" className="about">
      <div className="section-inner">
        <h2 className="about-title">AIでできることを広げていく。</h2>
        <div className="about-body">
          <div className="about-lead">
            <p>
              業務の財務分析からチーム診断ツール、ゲーム、ノウハウ記録まで、領域を問わず生成AIで実験と実装を繰り返しています。
            </p>
            <p>
              「Claude Codeで何を作れるか」を日々探求し、アイデアを素早くプロトタイプに落とし込むことが得意です。
              作ったものはすべて動くもの・残るドキュメントとして完成させることをポリシーにしています。
            </p>
          </div>
          <div className="about-stats">
            <div className="about-stat">
              <div className="num">
                {works.length}
                <span>+</span>
              </div>
              <div className="label">PROJECTS</div>
            </div>
            <div className="about-stat">
              <div className="num">{categoryCount}</div>
              <div className="label">CATEGORIES</div>
            </div>
            <div className="about-stat">
              <div className="num">2026</div>
              <div className="label">ACTIVE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
