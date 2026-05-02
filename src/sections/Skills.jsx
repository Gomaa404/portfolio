/* ============================================================
   Skills.jsx — Icon grid with animated progress bars,
   hover glow effects, and a "familiar with" tag cloud.
   ============================================================ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "../data/constants";

/* ── Single skill card (hover is CSS-only — no JS listener cost) ── */
function SkillCard({ skill, index }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon  = skill.icon;
  const isWhite = skill.color === "#ffffff";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
        delay: index * 0.04,
      }}
      className="group glass rounded-2xl p-5 flex flex-col items-center gap-3
                 cursor-default
                 transition-shadow duration-300 ease-out transform-gpu
                 hover:-translate-y-1 hover:scale-[1.04]"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Icon wrapper — colour-matched bg, vivid brand colour always */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center
                   transition-transform duration-300 group-hover:scale-110"
        style={{
          background: isWhite ? "var(--bg-subtle)" : `${skill.color}1a`,
          boxShadow: `0 0 0 1px ${isWhite ? "var(--border-strong)" : skill.color + "30"}`,
        }}
      >
        <Icon
          size={28}
          style={{ 
            color: isWhite ? "var(--text-primary)" : skill.color, 
            filter: `drop-shadow(0 0 6px ${isWhite ? "var(--border)" : skill.color + "99"})` 
          }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Name */}
      <span
        className="text-sm font-semibold transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        {skill.name}
      </span>

      {/* Animated progress bar */}
      <div
        className="w-full h-1 rounded-full overflow-hidden"
        style={{ background: "var(--border)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: isWhite ? "var(--text-primary)" : `linear-gradient(90deg, ${skill.color}, ${skill.color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: "easeOut" }}
        />
      </div>

      {/* Level % */}
      <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
        {skill.level}%
      </span>
    </motion.div>
  );
}

/* ── Extra tech tags ── */
const EXTRAS = [
  "JavaScript", "Vite", "Framer Motion", "Zustand",
  "Redux", "Sass", "Webpack", "Jest", "Vercel", "Storybook",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4 overflow-hidden">
      {/* BG orb */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full
                   blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">
            <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block" />
            Technical Skills
            <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Technologies I work with daily — from pixel-perfect UIs to smooth interactive frontends.
          </p>
        </motion.div>

        {/* ── Icon grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* ── Also familiar with ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs tracking-widest uppercase font-semibold mb-5" style={{ color: "var(--text-muted)" }}>
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {EXTRAS.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-xs font-medium cursor-default
                           glass transform-gpu
                           transition-all duration-200 hover:scale-105"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-violet)";
                  e.currentTarget.style.borderColor = "var(--accent-violet)";
                  e.currentTarget.style.background = "var(--accent-violet-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "";
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
