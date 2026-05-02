import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col h-full glass rounded-3xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_50px_oklch(0_0_0/0.4)]"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, oklch(0.82 0.18 290), oklch(0.75 0.18 200))",
              color: "oklch(0.10 0.01 260)",
            }}
          >
            ★ Featured
          </div>
        )}

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-[2px]">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 glass"
            style={{ border: "1px solid var(--border-strong)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub size={14} /> Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, oklch(0.82 0.18 290), oklch(0.75 0.18 200))",
              color: "oklch(0.10 0.01 260)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt size={12} /> Live Demo
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3
          className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            ["--tw-bg-clip-text"]: "text",
          }}
        >
          <span
            className="group-hover:bg-gradient-to-r group-hover:from-[oklch(0.82_0.18_290)] group-hover:to-[oklch(0.75_0.18_200)] group-hover:bg-clip-text group-hover:text-transparent transition-all"
          >
            {project.title}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: "oklch(0.82 0.18 290 / 0.12)",
                color: "oklch(0.82 0.18 290)",
                border: "1px solid oklch(0.82 0.18 290 / 0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
