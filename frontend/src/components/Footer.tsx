import { education, contact } from "../data/content";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contact" className="border-t" style={{ borderColor: "var(--rule)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-4">
            <p className="font-mono-label mb-4" style={{ color: "var(--accent)" }}>
              EDUCATION
            </p>
            <p className="font-serif-display mb-1" style={{ fontSize: "1.5rem", color: "var(--ink)" }}>
              {education.degree}
            </p>
            <p style={{ color: "var(--ink-secondary)" }}>{education.institution}</p>
            <p className="font-mono-label mt-2" style={{ color: "var(--ink-secondary)" }}>
              {education.dateRange}
            </p>
          </Reveal>

          <Reveal className="md:col-span-8" delay={0.05}>
            <h2
              className="font-serif-display mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}
            >
              Hiring? Let's talk.
            </h2>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${contact.email}`} className="hover-underline font-mono-label w-fit" style={{ color: "var(--ink)" }}>
                {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover-underline font-mono-label w-fit" style={{ color: "var(--ink)" }}>
                {contact.phone}
              </a>
              <span className="font-mono-label" style={{ color: "var(--ink-secondary)" }}>
                {contact.location}
              </span>
              {contact.linkedin ? (
                <a href={contact.linkedin} className="hover-underline font-mono-label w-fit" style={{ color: "var(--ink)" }}>
                  LinkedIn
                </a>
              ) : (
                // TODO: add LinkedIn URL in content.ts
                <span className="font-mono-label" style={{ color: "var(--ink-secondary)", opacity: 0.5 }}>
                  LinkedIn — coming soon
                </span>
              )}
              {contact.github ? (
                <a href={contact.github} className="hover-underline font-mono-label w-fit" style={{ color: "var(--ink)" }}>
                  GitHub
                </a>
              ) : (
                // TODO: add GitHub URL in content.ts
                <span className="font-mono-label" style={{ color: "var(--ink-secondary)", opacity: 0.5 }}>
                  GitHub — coming soon
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <div
          className="mt-20 pt-6 border-t flex flex-col md:flex-row justify-between gap-2"
          style={{ borderColor: "var(--rule)" }}
        >
          <p className="font-mono-label" style={{ color: "var(--ink-secondary)" }}>
            Built with React. Deployed on a Friday. © 2026 Hamza Asim.
          </p>
          <p className="font-mono-label" style={{ color: "var(--ink-secondary)" }}>
            This page has no cookie banner. You're welcome.
          </p>
        </div>
      </div>
    </footer>
  );
}
