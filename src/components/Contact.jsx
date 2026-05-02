import { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO } from "../data/constants";
import { Send, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SOCIAL_ICONS = { FaGithub, FaLinkedin, FaStackOverflow, MdEmail };

function InputField({ id, label, type = "text", placeholder, required, multiline }) {
  const shared = {
    id,
    name: id,
    placeholder,
    required,
    className: `w-full bg-white/5 border border-white/10 rounded-xl px-4 ${
      multiline ? "py-3 min-h-[130px] resize-none" : "py-3 h-12"
    } text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200`,
    style: { ["--tw-ring-color"]: "oklch(0.82 0.18 290 / 0.5)" },
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground/80">
        {label}
      </label>
      {multiline ? <textarea {...shared} /> : <input type={type} {...shared} />}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-28 px-4 overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full blur-[130px] -z-10 opacity-10"
        style={{ background: "oklch(0.82 0.18 290)" }} />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] rounded-full" style={{ background: "oklch(0.82 0.18 290)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "oklch(0.82 0.18 290)" }}>
              Contact
            </span>
            <div className="w-6 h-[2px] rounded-full" style={{ background: "oklch(0.82 0.18 290)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Left – info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Direct email */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-semibold">Direct Email</p>
              <a
                href={`mailto:${PORTFOLIO.email}`}
                className="text-lg font-bold transition-all duration-200 hover:underline"
                style={{ color: "oklch(0.82 0.18 290)" }}
              >
                {PORTFOLIO.email}
              </a>
            </div>

            {/* Availability */}
            <div className="glass rounded-2xl p-5" style={{ border: "1px solid oklch(0.75 0.22 150 / 0.3)" }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "oklch(0.75 0.22 150)" }} />
                  <span className="relative inline-flex rounded-full h-3 w-3"
                    style={{ background: "oklch(0.75 0.22 150)" }} />
                </span>
                <span className="font-bold text-sm" style={{ color: "oklch(0.75 0.22 150)" }}>
                  Currently Available
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open for freelance projects, full-time roles, and collaborations.
              </p>
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">Find Me Online</p>
              <div className="flex flex-col gap-3">
                {PORTFOLIO.socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ background: "oklch(0.82 0.18 290 / 0.12)", border: "1px solid oklch(0.82 0.18 290 / 0.2)" }}
                      >
                        <Icon size={16} style={{ color: "oklch(0.82 0.18 290)" }} />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="glass rounded-3xl p-8 md:p-10" style={{ border: "1px solid oklch(1 0 0 / 8%)" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.75 0.22 150 / 0.2)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "oklch(0.75 0.22 150)" }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out! I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm underline text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField id="name" label="Your Name" placeholder="John Doe" required />
                    <InputField id="email" label="Email Address" type="email" placeholder="john@example.com" required />
                  </div>
                  <InputField id="subject" label="Subject" placeholder="Project inquiry..." required />
                  <InputField id="message" label="Message" placeholder="Hello, I'd like to talk about..." required multiline />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.82 0.18 290), oklch(0.75 0.18 200))",
                      color: "oklch(0.10 0.01 260)",
                      boxShadow: "0 0 20px oklch(0.82 0.18 290 / 0.3)",
                    }}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
