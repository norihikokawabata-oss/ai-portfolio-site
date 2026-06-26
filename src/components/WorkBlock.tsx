import type { Work } from "../data/works";

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
        <img src={work.thumbnail} alt={work.title} />
      </div>
      <div className="work-info">
        <div className="work-meta">
          <span>{number}</span>
          <span>2026</span>
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
