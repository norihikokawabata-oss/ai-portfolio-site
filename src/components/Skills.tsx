const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "AI / CLAUDE CODE", items: ["Claude Code", "Claude Code Skill", "Sub Agent", "Claude in Chrome"] },
  { label: "FRONTEND", items: ["React", "TypeScript", "Chart.js"] },
  { label: "ツール", items: ["Obsidian", "GitHub Pages", "Git / GitHub"] },
];

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-inner">
        <h2 className="skills-title">技術スタック</h2>
        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="skills-col">
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
