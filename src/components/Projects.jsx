import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { PORTFOLIO } from "../data/constants";

const FILTERS = ["All", "React", "Next.js", "Node.js", "TypeScript"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? PORTFOLIO.projects
    : PORTFOLIO.projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <section id="projects" className="relative py-28 px-4 overflow-hidden">
      {/* BG */}
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full blur-[120px] -z-10 opacity-15"
        style={{ background: "oklch(0.82 0.18 290)" }} />

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] rounded-full" style={{ background: "oklch(0.82 0.18 290)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "oklch(0.82 0.18 290)" }}>
              Portfolio
            </span>
            <div className="w-6 h-[2px] rounded-full" style={{ background: "oklch(0.82 0.18 290)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A selection of projects that showcase my skills and passion for great software.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={
                activeFilter === filter
                  ? {
                      background: "linear-gradient(135deg, oklch(0.82 0.18 290), oklch(0.75 0.18 200))",
                      color: "oklch(0.10 0.01 260)",
                      boxShadow: "0 0 20px oklch(0.82 0.18 290 / 0.35)",
                    }
                  : {
                      background: "oklch(1 0 0 / 5%)",
                      border: "1px solid oklch(1 0 0 / 10%)",
                      color: "oklch(0.7 0 0)",
                    }
              }
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/Gomaa404?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 glass"
            style={{ border: "1px solid oklch(0.82 0.18 290 / 0.4)", color: "oklch(0.82 0.18 290)" }}
          >
            View all on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
