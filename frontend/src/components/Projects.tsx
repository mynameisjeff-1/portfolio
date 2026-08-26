import { ExternalLink } from "lucide-react";
import { projects } from "../data/content";
import { Reveal } from "./Reveal";
import {
  VoiceAgentDiagram,
  RagPlatformDiagram,
  WebOpsAgentDiagram,
  ObservabilityDiagram,
  MultiAgentDiagram,
} from "./ProjectDiagrams";
import { useTheme } from "../hooks/useTheme";

const DIAGRAMS = [VoiceAgentDiagram, RagPlatformDiagram, WebOpsAgentDiagram, ObservabilityDiagram, MultiAgentDiagram];

export function Projects() {
  const { theme } = useTheme();
  const colors =
    theme === "dark"
      ? { accent: "#e0644a", rule: "#2e2822", ink: "#f2ede4" }
      : { accent: "#c2452d", rule: "#ddd6cb", ink: "#14110f" };

  return (
    <section id="projects" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="font-mono-label mb-16" style={{ color: "var(--accent)" }}>
          04 — PROJECTS
        </p>
      </Reveal>

      <div className="flex flex-col gap-24">
        {projects.map((project, i) => {
          const Diagram = DIAGRAMS[i % DIAGRAMS.length];
          const reversed = i % 2 === 1;
          return (
            <Reveal key={project.title} delay={i * 0.04}>
              <div className="border-t pt-12" style={{ borderColor: "var(--rule)" }}>
                <div className="flex flex-wrap items-baseline gap-4 mb-4">
                  <h3
                    className="font-serif-display"
                    style={{
                      fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.02,
                      color: "var(--ink)",
                    }}
                  >
                    {project.displayTitle}
                  </h3>
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-underline font-mono-label inline-flex items-center gap-1.5"
                      style={{ color: "var(--ink-secondary)" }}
                      aria-label={`View ${project.displayTitle} repository on GitHub`}
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      Repo
                    </a>
                  ) : (
                    <span className="font-mono-label" style={{ color: "var(--ink-secondary)", opacity: 0.5 }}>
                      Private repo
                    </span>
                  )}
                </div>
                <p className="font-mono-label mb-10" style={{ color: "var(--ink-secondary)" }}>
                  {project.techStack.join("  ·  ")}
                </p>

                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 ${
                    reversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className="md:[direction:ltr]">
                    <ul className="space-y-4">
                      {project.bullets.map((b, bi) => (
                        <li key={bi} className="prose-measure" style={{ color: "var(--ink-secondary)" }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="md:[direction:ltr] flex items-center justify-center p-6 md:p-10 border"
                    style={{ backgroundColor: "var(--band)", borderColor: "var(--rule)", color: "var(--ink)" }}
                  >
                    <Diagram accent={colors.accent} rule={colors.rule} ink={colors.ink} />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
