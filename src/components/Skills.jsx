import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PORTFOLIO } from "../data/constants";

const CATEGORY_ICONS = {
  frontend: "⚡",
  backend: "🛠",
  tools: "🎛",
};

const CATEGORY_COLORS = {
  frontend: "oklch(0.82 0.18 290)",
  backend: "oklch(0.75 0.18 200)",
  tools: "oklch(0.65 0.22 15)",
};

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
          {name}
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 8%)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4 overflow-hidden">
      {/* Background orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] -z-10 opacity-20"
        style={{ background: "oklch(0.82 0.18 290)" }} />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] rounded-full" style={{ background: "oklch(0.82 0.18 290)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "oklch(0.82 0.18 290)" }}>
              Expertise
            </span>
            <div className="w-6 h-[2px] rounded-full" style={{ background: "oklch(0.82 0.18 290)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Technologies I've mastered and love working with on a daily basis.
          </p>
        </motion.div>

        {/* Skill cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(PORTFOLIO.skills).map(([category, skills], catIdx) => {
            const color = CATEGORY_COLORS[category];
            const icon = CATEGORY_ICONS[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.12 }}
                className="glass rounded-3xl p-7 hover:shadow-[0_0_40px_oklch(0_0_0/0.3)] transition-shadow duration-500 group"
                style={{ border: `1px solid ${color}22` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform group-hover:scale-110"
                    style={{ background: `${color}22` }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg capitalize" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {category}
                    </h3>
                    <p className="text-xs text-muted-foreground">{skills.length} technologies</p>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="space-y-5">
                  {skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={color}
                      index={i + catIdx * 5}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tags cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6 font-medium uppercase tracking-widest">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["GraphQL", "Redis", "Kubernetes", "Terraform", "Python", "C#", "Linux", "Nginx", "AWS", "Vercel"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.04 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-full text-sm font-medium cursor-default transition-colors glass"
                style={{ border: "1px solid oklch(1 0 0 / 10%)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
