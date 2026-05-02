/* ============================================================
   About.jsx — Scroll-reveal about section with experience
   timeline, floating image card, and info chips.
   ============================================================ */
import { motion } from "framer-motion";
import { MapPin, Calendar, Download, ArrowRight } from "lucide-react";
import { PERSON, EXPERIENCE } from "../data/constants";
import profileImg from "../assets/img.jpeg";

/* Reusable scroll-reveal wrapper — spring physics */
function Reveal({ children, delay = 0, direction = "up" }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 28 : direction === "down" ? -28 : 0,
      x: direction === "left" ? 28 : direction === "right" ? -28 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4 overflow-hidden">
      {/* BG blob */}
      <div
        className="absolute -left-40 top-1/3 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0891b2, transparent)" }}
      />

      <div className="max-w-6xl mx-auto ">
        {/* Section label & Title */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-label inline-flex items-center justify-center mb-6">
              <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block mr-3" />
              About Me
              <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block ml-3" />
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Crafting experiences,{" "}
              <span className="gradient-text">not just code.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* ── Left: Image + floating cards ── */}
          <Reveal direction="right" delay={0.1}>
            <div className="relative max-w-sm mx-auto group">
              {/* Spinning gradient ring */}
              <div
                className="absolute -inset-1 rounded-3xl blur-sm opacity-40 group-hover:opacity-70
                           transition-opacity duration-700 animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #7c3aed, #0891b2, #22d3ee, #7c3aed)",
                }}
              />
              {/* Photo — LCP element: fetchpriority high, decoding async */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img
                  src={profileImg}
                  alt={PERSON.name}
                  width={800}
                  height={1067}
                  fetchpriority="high"
                  decoding="async"
                  className="w-full aspect-[3/4] object-cover object-center
                             group-hover:scale-105 transition-transform duration-700 transform-gpu"
                  style={{ objectPosition: "50% 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
              </div>

              {/* Floating chip – Location (CSS-animated, no JS motion instance) */}
              <div
                className="absolute -bottom-5 -right-5 glass rounded-2xl px-4 py-3
                           flex items-center gap-2.5 shadow-xl animate-float"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.2)" }}>
                  <MapPin size={13} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 leading-none mb-0.5">Based in</p>
                  <p className="text-sm font-semibold leading-none">{PERSON.location}</p>
                </div>
              </div>

              {/* Floating chip – Years (offset phase via animation-delay) */}
              <div
                className="absolute -top-5 -left-5 glass rounded-2xl px-4 py-3
                           flex items-center gap-2.5 shadow-xl animate-float"
                style={{ animationDelay: '-2.5s', animationDirection: 'reverse' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(8,145,178,0.2)" }}>
                  <Calendar size={13} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 leading-none mb-0.5">Experience</p>
                  <p className="text-sm font-semibold leading-none">2+ Years</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: Text + timeline ── */}
          <div>
            <Reveal delay={0.2}>
              <p className="text-white/50 text-lg leading-relaxed mb-3">
                Hey! I'm <strong className="text-white">{PERSON.name}</strong> — a passionate
                Frontend Developer based in Cairo, Egypt. I love turning complex problems into
                clean, intuitive, high-performance web applications.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                My journey started with curiosity about how the web works and grew into a
                career building products that millions of users interact with every day.
              </p>
            </Reveal>

            {/* Experience timeline */}
            <Reveal delay={0.3}>
              <p className="text-xs text-white/30 tracking-widest uppercase font-semibold mb-5">
                Work Experience
              </p>
              <div className="space-y-5 mb-10">
                {EXPERIENCE.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                    className="relative pl-5"
                    style={{ borderLeft: "2px solid rgba(124,58,237,0.35)" }}
                  >
                    {/* dot */}
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-violet-500" />
                    <div className="flex flex-wrap gap-2 items-baseline mb-1">
                      <span className="font-semibold text-sm text-white">{exp.title}</span>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}
                      >
                        {exp.company}
                      </span>
                      <span className="text-xs text-white/30">{exp.period}</span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">{exp.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Download CV */}
            <Reveal delay={0.5}>
              <a
                href="/Abdallahmohamedgomaa.pdf"
                download="Abdallah_Mohamedgomaa_CV.pdf"
                className="btn-ghost inline-flex px-6 py-3 text-sm"
              >
                <Download size={14} />
                Download CV
                <ArrowRight size={13} className="ml-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
