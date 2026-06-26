import { works } from "../data/works";
import { WorkBlock } from "./WorkBlock";

export function Works() {
  return (
    <section id="works" className="works">
      <div className="section-inner">
        <div className="works-label">WORKS</div>
        <div className="works-heading">
          <h2 className="works-title">制作実績</h2>
          <span className="works-count">{String(works.length).padStart(2, "0")} PROJECTS</span>
        </div>
      </div>
      <div className="section-inner">
        {works.map((work, index) => (
          <WorkBlock key={work.id} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}
