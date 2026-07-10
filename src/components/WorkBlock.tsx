import type { Work } from "../data/works";
import { SITE_YEAR } from "../data/site";

interface WorkBlockProps {
  work: Work;
  index: number;
}

export function WorkBlock({ work, index }: WorkBlockProps) {
  const number = String(index + 1).padStart(2, "0");
  const reverse = index % 2 === 1;

  return (
    <div className={`work-block${reverse ? " reverse" : ""}`}>
      <div className="work-media">
        <img
          src={work.thumbnail}
          alt={work.title}
          width={work.width}
          height={work.height}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // アセット読込失敗時は壊れた画像アイコンの代わりに枠色のプレースホルダを表示
            e.currentTarget.onerror = null;
            e.currentTarget.style.background = "var(--color-paper-soft)";
          }}
        />
      </div>
      <div className="work-info">
        <div className="work-meta">
          <span>{number}</span>
          <span>{SITE_YEAR}</span>
        </div>
        <h3 className="work-title">{work.title}</h3>
        <p className="work-description">{work.description}</p>
        <div className="work-tags">
          {work.tags.map((tag) => (
            <span key={tag} className="work-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
