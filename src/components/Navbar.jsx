/* ============================================================
   Navbar.jsx — sticky nav with active section highlight,
   dark-mode toggle, animated mobile drawer, and a smooth
   custom-eased scroll engine (faster / silkier than native).
   ============================================================ */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { PERSON } from "../data/constants";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"];

/* ── Silky smooth scroll (custom easing, ~250 ms) ── */
function smoothScrollTo(targetY, duration = 250) {
  const startY  = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  // Ease-in-out cubic
  const ease = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // Account for 64px sticky nav + 8px breathing room
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  smoothScrollTo(top);
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPct,     setScrollPct]     = useState(0);
  const rafId = useRef(null);

  /* ── RAF-throttled scroll listener — updates active section + progress bar ── */
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const y   = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 60);
        setScrollPct(max > 0 ? (y / max) * 100 : 0);

        for (const id of [...SECTION_IDS].reverse()) {
          const el = document.getElementById(id);
          if (el && y >= el.offsetTop - 120) {
            setActiveSection(id);
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* ── Smooth nav handler ── */
  const handleLink = useCallback((href) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    scrollToId(id);
  }, []);

  const toggleMenu = useCallback(() => setMobileOpen((o) => !o), []);

  /* ── Prevent body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Scroll-progress bar ── */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled || mobileOpen
            ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLink("#hero"); }}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold
                         transition-transform duration-150 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AG
            </div>
            <span className="font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {PERSON.name.split(" ")[0]}
              <span className="text-violet-400">.</span>
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleLink(href); }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-75 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/90"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}
                      transition={{ type: "spring", stiffness: 900, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 theme-toggle"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 90,    opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
              className="ml-3 btn-neon px-5 py-2 text-sm text-white"
            >
              Hire Me
            </a>
          </nav>

          {/* ── Mobile controls ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 90,    opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleMenu}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/80"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 90,    opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-gray-950/95 backdrop-blur-xl border-b border-white/5"
            >
              <div className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const isActive = activeSection === href.replace("#", "");
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      onClick={(e) => { e.preventDefault(); handleLink(href); }}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0,   opacity: 1 }}
                      transition={{ delay: i * 0.03, type: "spring", stiffness: 600, damping: 25 }}
                      className={`relative block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-75 ${
                        isActive ? "text-white" : "text-white/50 hover:text-white/90"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-mobile"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}
                          transition={{ type: "spring", stiffness: 900, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </motion.a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
                  className="mt-2 btn-neon py-3 text-sm text-white text-center"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
