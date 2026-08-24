import { publications } from "../data/content";
import { Reveal } from "./Reveal";

export function Research() {
  return (
    <section id="research" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="font-mono-label mb-16" style={{ color: "var(--accent)" }}>
          05 — RESEARCH
        </p>
      </Reveal>

      <div className="flex flex-col gap-12 max-w-3xl">
        {publications.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 0.04}>
            <div
              className="pl-6 md:pl-10 border-t pt-8"
              style={{ borderColor: "var(--rule)", textIndent: "0" }}
            >
              <div className="flex flex-wrap items-baseline gap-3 mb-2 -ml-6 md:-ml-10">
                <span className="font-mono-label" style={{ color: "var(--ink-secondary)", width: "auto" }}>
                  {pub.year}
                </span>
                <span
                  className="font-mono-label px-2 py-0.5 border"
                  style={{ borderColor: "var(--rule)", color: "var(--accent)" }}
                >
                  {pub.status}
                </span>
              </div>
              <h3
                className="font-serif-display mb-3"
                style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", lineHeight: 1.15, color: "var(--ink)" }}
              >
                {pub.title}
              </h3>
              <p className="mb-4" style={{ color: "var(--ink-secondary)" }}>
                {pub.abstract}
              </p>
              <p className="mb-4" style={{ color: "var(--ink-secondary)" }}>
                {pub.summary}
              </p>
              {pub.url && (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-underline font-mono-label"
                  style={{ color: "var(--accent)" }}
                >
                  View paper →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="font-mono-label mt-14 max-w-md" style={{ color: "var(--ink-secondary)" }}>
          Paper one is about AI systems that agree with each other too much. The chatbot above has been instructed not to do this.
        </p>
      </Reveal>
    </section>
  );
}
