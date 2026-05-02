/* ============================================================
   Projects.jsx — Filterable project grid with animated cards,
   hover overlay actions, and featured badges.
   ============================================================ */
import { useState, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "../data/constants";

const FILTERS = ["All", "React", "TypeScript", "JavaScript", "HTML", "CSS"];

/* ── Single project card (Memoized for performance) ── */
const ProjectCard = memo(function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        delay: index * 0.04,
      }}
      className="group flex flex-col rounded-3xl overflow-hidden glass cursor-default
                 transition-shadow duration-300 ease-out hover:-translate-y-1.5
                 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transform-gpu"
      style={{ border: "1px solid var(--border)", willChange: "transform, opacity" }}
    >
      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden bg-gray-900/50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
          onError={(e) => { e.target.style.opacity = "0.3"; }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent pointer-events-none" />

        {/* Colour glow at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
          style={{ background: `linear-gradient(to top, ${project.color}33, transparent)` }}
        />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full
                       text-[10px] font-bold shadow-lg pointer-events-none"
            style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)", color: "#ffffff" }}
          >
            <Star size={9} fill="currentColor" /> Featured
          </div>
        )}

        {/* Hover action overlay (CSS only for performance) */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gray-950/50 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold
                       hover:scale-105 transition-transform"
            style={{ border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub size={13} /> Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                       hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)", color: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} /> Live Demo
          </a>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-lg font-bold mb-2 relative">
          <span 
            className="transition-opacity duration-300 ease-out group-hover:opacity-0 block"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </span>
          <span 
            className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out bg-clip-text text-transparent block"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.color}, #22d3ee)`,
              WebkitBackgroundClip: "text",
            }}
          >
            {project.title}
          </span>
        </h3>
        <p 
          className="text-sm leading-relaxed flex-grow mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-2 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{
                background: `${project.color}18`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Preload images for next and previous filters to optimize switching
  useEffect(() => {
    const currentIndex = FILTERS.indexOf(activeFilter);
    const prevFilter = FILTERS[currentIndex > 0 ? currentIndex - 1 : FILTERS.length - 1];
    const nextFilter = FILTERS[currentIndex < FILTERS.length - 1 ? currentIndex + 1 : 0];

    const preloadForFilter = (filterName) => {
      if (!filterName) return;
      const projectsToPreload = filterName === "All" 
        ? PROJECTS 
        : PROJECTS.filter((p) => p.tags.some((t) => t.toLowerCase().includes(filterName.toLowerCase())));
      
      projectsToPreload.forEach(p => {
        if (p.image) {
          const img = new Image();
          img.src = p.image;
        }
      });
    };

    preloadForFilter(prevFilter);
    preloadForFilter(nextFilter);
  }, [activeFilter]);

  // Memoize filtered projects to prevent unnecessary recalculations
  const filtered = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="relative py-28 px-4 overflow-hidden">
      {/* BG orb */}
      <div
        className="absolute left-0 bottom-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center">
            <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block" />
            Portfolio
            <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p 
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            A curated selection of projects that showcase my skills and love for great software.
          </p>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                         hover:scale-105 active:scale-95"
              style={
                activeFilter === f
                  ? {
                      background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                      color: "#fff",
                      boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
                    }
                  : {
                      background: "var(--bg-muted)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    }
              }
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* ── Card grid ── */}
        <div className="min-h-[1200px] sm:min-h-[800px] lg:min-h-[400px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filtered.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/Gomaa404?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex px-8 py-3.5 text-sm gap-2"
          >
            <FaGithub size={15} />
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

