import { award } from "../data/content";
import { Reveal } from "./Reveal";

export function Award() {
  return (
    <section style={{ backgroundColor: "var(--band)" }} className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono-label mb-8" style={{ color: "var(--accent)" }}>
            06 — AWARD
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10 mb-10">
          <Reveal>
            <h2
              className="font-serif-display"
              style={{
                fontSize: "clamp(4rem, 12vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              {award.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-mono-label max-w-xs" style={{ color: "var(--ink-secondary)" }}>
              {award.detail}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="prose-measure mb-10" style={{ color: "var(--ink-secondary)" }}>
            {award.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-x-10 gap-y-3 border-t pt-6" style={{ borderColor: "var(--rule)" }}>
            {award.stats.map((stat) => (
              <span key={stat} className="font-mono-label" style={{ color: "var(--ink)" }}>
                {stat}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
