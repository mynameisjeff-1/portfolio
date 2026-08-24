import { motion } from "framer-motion";
import { profile } from "../data/content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--paper)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 min-h-[100dvh] pt-16">
        {/* Portrait — mobile: above headline */}
        <div className="md:hidden relative h-[42vh] overflow-hidden -mx-6">
          <picture>
            <source srcSet="/images/portrait.webp" type="image/webp" />
            <img
              src="/images/portrait.png"
              alt={`Portrait of ${profile.name}`}
              width={1343}
              height={1586}
              className="absolute inset-x-0 bottom-0 mx-auto h-full max-h-full w-auto object-contain object-bottom"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Left: text content */}
        <motion.div
          className="md:col-span-7 flex flex-col justify-center py-10 md:py-0 relative z-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="font-mono-label mb-6" style={{ color: "var(--accent)" }}>
            {profile.title} — {profile.location}
          </p>

          <h1
            className="font-serif-display"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            I build AI systems
            <br />
            that survive contact
            <br />
            with <span style={{ color: "var(--accent)" }}>production.</span>
          </h1>

          <p
            className="mt-8 prose-measure"
            style={{ color: "var(--ink-secondary)", fontSize: "17px" }}
          >
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#chat"
              className="font-mono-label px-6 py-3.5 inline-block"
              style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
            >
              Ask my AI anything →
            </a>
            <a href="/cv.pdf" className="hover-underline font-mono-label" style={{ color: "var(--ink)" }}>
              Download CV
            </a>
          </div>

          <p className="mt-8 font-mono-label" style={{ color: "var(--ink-secondary)", letterSpacing: "0.05em" }}>
            Yes, the chatbot below is trained on my CV. No, it will not tell you my expected salary.
          </p>
        </motion.div>

        {/* Right: portrait, desktop only */}
        <div className="hidden md:flex md:col-span-5 relative items-end justify-end">
          <picture>
            <source srcSet="/images/portrait.webp" type="image/webp" />
            <img
              src="/images/portrait.png"
              alt={`Portrait of ${profile.name}`}
              width={1343}
              height={1586}
              className="relative h-[85vh] w-auto object-contain object-bottom -mr-6 lg:mr-0"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
