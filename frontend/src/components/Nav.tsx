import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { profile } from "../data/content";

const LINKS = [
  { href: "#chat", label: "Chat" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

interface NavProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "var(--paper)" : "transparent",
        borderColor: "var(--rule)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#main" className="font-mono-label" style={{ color: "var(--ink)" }}>
          {profile.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover-underline font-mono-label"
              style={{ color: "var(--ink-secondary)" }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-1.5"
            style={{ color: "var(--ink)" }}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a
            href="#chat"
            className="font-mono-label px-4 py-2 border"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            Ask my AI
          </a>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-1.5"
            style={{ color: "var(--ink)" }}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{ color: "var(--ink)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-6 flex flex-col gap-5"
          style={{ backgroundColor: "var(--paper)", borderColor: "var(--rule)" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono-label"
              style={{ color: "var(--ink-secondary)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#chat"
            onClick={() => setMenuOpen(false)}
            className="font-mono-label px-4 py-2 border inline-block w-fit"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            Ask my AI
          </a>
        </div>
      )}
    </nav>
  );
}
