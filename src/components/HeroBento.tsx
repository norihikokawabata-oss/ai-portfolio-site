import type { Work } from "../data/works";
import { WorkCard } from "./WorkCard";

interface HeroBentoProps {
  heroWorks: Work[]; // isHero===true の5件をこの順で渡す(先頭がメインカード)
  onSelect: (work: Work) => void;
}

export function HeroBento({ heroWorks, onSelect }: HeroBentoProps) {
  const [main, ...sub] = heroWorks;

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "12px",
        height: "360px",
        marginBottom: "40px",
      }}
    >
      <div style={{ gridRow: "span 2" }}>
        <WorkCard work={main} onSelect={onSelect} variant="hero-main" />
      </div>
      {sub.map((work) => (
        <div key={work.id}>
          <WorkCard work={work} onSelect={onSelect} variant="hero-sub" />
        </div>
      ))}
    </section>
  );
}
