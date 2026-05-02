/* ============================================================
   Contact.jsx — Two-column contact section: info + social
   links on the left, animated form with loading state on the
   right.
   ============================================================ */
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MapPin, Mail, Clock } from "lucide-react";
import { PERSON, SOCIALS } from "../data/constants";

/* ── Styled input / textarea ── */
function Field({ id, label, type = "text", placeholder, required, rows }) {
  const base =
    `w-full rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/10
     text-white placeholder:text-white/25 focus:outline-none focus:ring-2
     focus:ring-violet-500/60 focus:border-violet-500/50 transition-all duration-200`;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-white/60">
        {label}
      </label>
      {rows ? (
        <textarea id={id} name={id} placeholder={placeholder} required={required}
          rows={rows} className={`${base} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} placeholder={placeholder} required={required}
          className={base} />
      )}
    </div>
  );
}

/* ── Info chip ── */
function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <Icon size={15} className="text-violet-400" />
      </div>
      <div>
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">{label}</p>
        <p className="text-sm font-medium text-white/80">{value}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg,  setErrorMsg]  = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.target);
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const subject = formData.get("subject")?.trim() || "";
    const message = formData.get("message")?.trim() || "";

    // ── 1. Spam Protection (Honeypot) ──
    // If a bot fills this hidden field, we stop processing
    if (formData.get("_honey")) {
      return;
    }

    // ── 2. Validation ──
    if (!name || !email || !subject || !message) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      setErrorMsg("Your message is too short. Please provide more details.");
      return;
    }

    setLoading(true);

    // FormSubmit configs
    formData.append("_subject", "New Message from Portfolio");
    formData.append("_captcha", "false");

    try {
      // ── 3. Send email ──
      const response = await fetch(`https://formsubmit.co/ajax/${PERSON.email}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset(); // clear form
      } else {
        setErrorMsg("Form submission failed. Please try again later.");
      }
    } catch (error) {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 overflow-hidden">
      {/* BG orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 rounded-full
                   blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed, transparent)" }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">
            <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block" />
            Get In Touch
            <span className="w-5 h-[2px] bg-violet-400 rounded-full inline-block" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Info chips */}
            <div className="space-y-5">
              <InfoChip icon={Mail}   label="Email"    value={PERSON.email} />
              <InfoChip icon={MapPin} label="Location" value={PERSON.location} />
              <InfoChip icon={Clock}  label="Response" value="Within 24 hours" />
            </div>

            {/* Availability badge */}
            <div
              className="glass rounded-2xl p-5"
              style={{ border: "1px solid rgba(52,211,153,0.25)" }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-bold text-emerald-400">Currently Available</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Open to freelance projects, full-time roles, and exciting collaborations.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase font-semibold mb-4">
                Find Me Online
              </p>
              <div className="flex flex-col gap-3">
                {SOCIALS.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center
                                 transition-all group-hover:scale-110"
                      style={{
                        background: "rgba(124,58,237,0.1)",
                        border: "1px solid rgba(124,58,237,0.2)",
                      }}
                    >
                      <Icon size={15} className="text-violet-400" />
                    </div>
                    <span className="text-sm text-white/50 group-hover:text-white transition-colors font-medium">
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="glass rounded-3xl p-8 md:p-10">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 gap-5 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(52,211,153,0.15)" }}
                  >
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message Sent! 🎉
                  </h3>
                  <p className="text-white/40 max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-violet-400 hover:underline mt-2 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Validation Error Message */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field id="name"  label="Your Name"      placeholder="John Doe"            required />
                    <Field id="email" label="Email Address"  type="email"
                           placeholder="john@example.com"   required />
                  </div>
                  <Field id="subject" label="Subject"   placeholder="Project inquiry..." required />
                  <Field id="message" label="Message"   placeholder="Hello, I'd like to talk about..." required rows={5} />

                  {/* Honeypot for spam protection */}
                  <input type="text" name="_honey" style={{ display: "none" }} />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-semibold text-sm flex items-center
                               justify-center gap-2 transition-all duration-300 text-white
                               hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]
                               disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)" }}
                  >
                    {loading ? (
                      <motion.span
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                         className="w-5 h-5 border-2 border-white border-t-transparent rounded-full block"
                      />
                    ) : (
                      <>
                        <Send size={14} /> Send Message
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
