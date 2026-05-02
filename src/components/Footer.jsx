/* ============================================================
   Footer.jsx — Premium redesigned footer
   ============================================================ */
import { PERSON, SOCIALS } from "../data/constants";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight, MapPin, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--bg-base)" }}>

      {/* ── Animated gradient top border ── */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #7c3aed 30%, #22d3ee 70%, transparent)",
          opacity: 0.6,
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -top-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(8,145,178,0.10), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-8">

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1 flex flex-col gap-5">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                AG
              </motion.div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
              >
                {PERSON.name}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: "var(--text-secondary)" }}>
              {PERSON.tagline}
            </p>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,0.10)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#4ade80",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                style={{ boxShadow: "0 0 6px #4ade80" }}
              />
              <Zap size={10} />
              Available for work
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
              <MapPin size={12} style={{ color: "var(--accent-violet)" }} />
              {PERSON.location}
            </div>
          </div>

          {/* Col 2 — Nav */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent-violet)" }}>
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group flex items-center gap-1.5 text-sm transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    <span
                      className="w-4 h-px transition-all duration-300 group-hover:w-6"
                      style={{ background: "var(--accent-violet)" }}
                    />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Connect */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
              Connect
            </p>

            {/* Social icon grid */}
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--text-tertiary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#a78bfa";
                      e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                      e.currentTarget.style.background = "rgba(124,58,237,0.12)";
                      e.currentTarget.style.boxShadow = "0 0 16px rgba(124,58,237,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-tertiary)";
                      e.currentTarget.style.borderColor = "var(--glass-border)";
                      e.currentTarget.style.background = "var(--glass-bg)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>

            {/* CTA */}
            <motion.a
              href={`mailto:${PERSON.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold w-fit transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(8,145,178,0.15))",
                border: "1px solid rgba(124,58,237,0.35)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 24px rgba(124,58,237,0.3)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)";
              }}
            >
              Let's work together
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px mb-6"
          style={{ background: "var(--border)" }}
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            © {year}{" "}
            <span style={{ color: "var(--text-secondary)" }}>{PERSON.name}</span>.
            {" "}All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
