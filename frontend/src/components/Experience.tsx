import { Fragment } from "react";
import { experience } from "../data/content";
import { Reveal } from "./Reveal";

const METRIC_PATTERN = /(\d[\d,]*\+?%?)/g;

function renderWithMetrics(text: string) {
  const parts = text.split(METRIC_PATTERN);
  return parts.map((part, i) =>
    METRIC_PATTERN.test(part) && /\d/.test(part) ? (
      <span key={i} style={{ color: "var(--accent)" }}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function Experience() {
  return (
    <section id="experience" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="font-mono-label mb-10" style={{ color: "var(--accent)" }}>
          03 — WORK
        </p>
      </Reveal>

      <div>
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 0.04}>
            <div
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-t"
              style={{ borderColor: "var(--rule)" }}
            >
              <div className="md:col-span-3">
                <p className="font-mono-label" style={{ color: "var(--ink-secondary)" }}>
                  {role.dateRange}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3
                  className="font-serif-display mb-1"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--ink)", letterSpacing: "-0.01em" }}
                >
                  {role.title}
                </h3>
                <p className="font-mono-label mb-6" style={{ color: "var(--ink-secondary)" }}>
                  {role.company}
                </p>
                <ul className="space-y-3">
                  {role.bullets.map((b, bi) => (
                    <li key={bi} className="prose-measure" style={{ color: "var(--ink-secondary)" }}>
                      {renderWithMetrics(b)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
