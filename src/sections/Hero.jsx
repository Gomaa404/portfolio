/* ============================================================
   Hero.jsx — Full-viewport section with React Three Fiber 3D
   background, typing animation, stats row, and CTA buttons.
   ============================================================ */
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

import { PERSON, STATS, SOCIALS } from "../data/constants";

/* ── Smooth-scroll helper (shared with Navbar) ── */
function smoothScrollTo(targetY, duration = 520) {
  const startY   = window.scrollY;
  const distance = targetY - startY;
  let startTime  = null;
  const ease = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const step = (ts) => {
    if (!startTime) startTime = ts;
    const prog = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(prog));
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 72);
}

/* ── Typing animation hook ── */
function useTyping(words, speed = 80, deleteSpeed = 45, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timer;
    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIdx, words, speed, deleteSpeed, pause]);

  return displayed;
}

/* ── Extracted Typewriter component to avoid full Hero re-renders ── */
const Typewriter = React.memo(({ words }) => {
  const typed = useTyping(words);
  return (
    <>
      <span className="gradient-text glow-violet">{typed}</span>
      <span
        className="cursor-blink ml-1 inline-block w-[3px] h-[0.85em] align-middle rounded-sm"
        style={{ background: "#818cf8" }}
      />
    </>
  );
});

/* ── Animated stat card (memoized, CSS hover only) ── */
const StatCard = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45 }}
    className="glass rounded-2xl px-5 py-4 text-center cursor-default
               transform-gpu transition-transform duration-200 ease-out
               hover:-translate-y-1 hover:scale-[1.04]"
  >
    <div
      className="text-3xl font-extrabold gradient-text mb-1"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {value}
    </div>
    <div className="text-[11px] text-white/40 font-medium tracking-widest uppercase">
      {label}
    </div>
  </motion.div>
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-18 lg:pt-0 transform-gpu"
      style={{ background: "var(--bg-base)" }}
    >

      {/* ── Ambient glow blobs (theme-aware) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 30% 40%, rgba(124,58,237,0.12), transparent 70%), radial-gradient(ellipse 50% 50% at 70% 60%, rgba(8,145,178,0.08), transparent 70%)",
        }}
      />

      {/* ── Radial vignette — theme-aware via CSS class ── */}
      <div className="hero-vignette absolute inset-0 pointer-events-none" />

      {/* ── Grid overlay — theme-aware via CSS class ── */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass text-xs font-semibold
                     tracking-widest uppercase"
          style={{ border: "1px solid rgba(139,92,246,0.3)", color: "var(--accent-violet)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for opportunities
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-base md:text-lg mb-3 tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          Hey there 👋 — I'm{" "}
          <span className="whitespace-nowrap" style={{ color: "var(--text-primary)", fontWeight: 700 }}>{PERSON.name}</span>
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05]
                     tracking-tight mb-6 grid place-items-center"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {/* Invisible longest role to reserve space and prevent layout shifts */}
          <div className="col-start-1 row-start-1 invisible pointer-events-none" aria-hidden="true">
            {PERSON.roles.reduce((a, b) => (a.length > b.length ? a : b), "")}
          </div>
          {/* Visible typing text */}
          <div className="col-start-1 row-start-1">
            <Typewriter words={PERSON.roles} />
          </div>
        </motion.h1>

        {/* Tagline */}
        <p
          className="text-base md:text-xl max-w-2xl leading-relaxed mb-10 px-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {PERSON.tagline.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {i < PERSON.tagline.split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 300, damping: 28 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToId("projects"); }}
            className="btn-neon px-8 py-3.5 text-sm text-white"
          >
            View My Work
          </a>
          <a
            href="/Abdallahmohamedgomaa.pdf"
            download="Abdallah_Mohamedgomaa_CV.pdf"
            className="btn-ghost px-8 py-3.5 text-sm"
          >
            <Download size={14} />
            Download CV
          </a>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={0.6 + i * 0.1} />
          ))}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex gap-4 mt-10"
        >
          {SOCIALS.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center
                         hover:scale-110 transition-all duration-200"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-violet)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator (CSS-animated — no JS motion loop) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5
                   cursor-pointer"
        style={{ color: "var(--text-muted)" }}
        onClick={() => scrollToId("about")}
      >
        <span className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "var(--text-muted)" }}>Scroll</span>
        {/* Pure CSS bounce — replaces perpetual framer-motion animate loop */}
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="animate-float"
          style={{ animationDuration: '1.4s' }}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
