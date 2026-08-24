import { volunteer } from "../data/content";
import { Reveal } from "./Reveal";

export function Community() {
  if (!volunteer.description) return null;

  return (
    <section id="community" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="font-mono-label mb-10" style={{ color: "var(--accent)" }}>
          07 — COMMUNITY
        </p>
        <div className="max-w-2xl">
          <h3 className="font-serif-display mb-6" style={{ fontSize: "2rem", color: "var(--ink)" }}>
            {volunteer.organization}
          </h3>
          <div className="space-y-5" style={{ color: "var(--ink-secondary)", fontSize: "17px" }}>
            {volunteer.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {volunteer.url && (
            <a
              href={volunteer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline font-mono-label inline-block mt-6"
              style={{ color: "var(--accent)" }}
            >
              View post →
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
