import { skills } from "../data/content";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="font-mono-label mb-10" style={{ color: "var(--accent)" }}>
          08 — SKILLS
        </p>
      </Reveal>

      <div>
        {skills.map((cat, i) => (
          <Reveal key={cat.category} delay={i * 0.03}>
            <div
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-7 border-t"
              style={{ borderColor: "var(--rule)" }}
            >
              <div className="md:col-span-3">
                <p className="font-mono-label" style={{ color: "var(--ink)" }}>
                  {cat.category}
                </p>
              </div>
              <div className="md:col-span-9">
                <p className="prose-measure" style={{ color: "var(--ink-secondary)", fontSize: "17px" }}>
                  {cat.skills.join(", ")}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
