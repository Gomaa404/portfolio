import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PORTFOLIO } from "../data/constants";
import { FaArrowDown } from "react-icons/fa";

const CURSOR_BLINK = 500;

function TypingText({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor((c) => !c), CURSOR_BLINK);
    return () => clearInterval(cursor);
  }, []);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <span className="gradient-text font-bold">
      {words[wordIndex].slice(0, charIndex)}
      <span
        className="inline-block w-[3px] h-[0.9em] ml-1 align-middle rounded-sm"
        style={{
          background: "oklch(0.82 0.18 290)",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 animate-float"
        style={{ background: "oklch(0.82 0.18 290 / 0.15)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 animate-float-delayed"
        style={{ background: "oklch(0.75 0.18 200 / 0.12)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] -z-10"
        style={{ background: "oklch(0.82 0.18 290 / 0.04)" }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto max-w-5xl flex flex-col items-center text-center relative z-10">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium tracking-wide"
          style={{ border: "1px solid oklch(0.82 0.18 290 / 0.3)", color: "oklch(0.82 0.18 290)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "oklch(0.75 0.22 150)" }} />
            <span className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "oklch(0.75 0.22 150)" }} />
          </span>
          Open to new opportunities
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-lg md:text-xl text-muted-foreground mb-3 tracking-widest uppercase font-medium"
        >
          Hi, I'm <span className="text-foreground font-semibold">{PORTFOLIO.name}</span>
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          I build digital
          <br />
          <TypingText words={PORTFOLIO.roles} />
        </motion.h1>

        {/* Bio */}
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 px-4"
        >
          {PORTFOLIO.bio}
        </motion.p> */}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.82 0.18 290), oklch(0.75 0.18 200))",
              color: "oklch(0.10 0.01 260)",
              boxShadow: "0 0 30px oklch(0.82 0.18 290 / 0.3)",
            }}
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(135deg, oklch(0.88 0.18 290), oklch(0.82 0.18 200))" }} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 glass"
            style={{ border: "1px solid oklch(1 0 0 / 15%)", color: "oklch(0.97 0 0)" }}
          >
            Contact Me
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl"
        >
          {PORTFOLIO.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-extrabold gradient-text mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <FaArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
