/* ============================================================
   LoadingScreen.jsx
   2-second animated intro before the portfolio appears.
   ============================================================ */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Simulate progress 0 → 100 over ~1.8s
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          // Small delay then start exit animation
          setTimeout(() => {
            setHiding(true);
            setTimeout(onDone, 600);
          }, 200);
          return 100;
        }
        return p + Math.random() * 8 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!hiding && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950"
        >
          {/* Animated orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[100px] opacity-30 animate-pulse-glow"
              style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[100px] opacity-20 animate-pulse-glow"
              style={{ background: "radial-gradient(circle, #0891b2, transparent)", animationDelay: "1s" }} />
          </div>

          {/* Logo / spinner */}
          <div className="relative mb-10">
            {/* Spinning gradient ring */}
            <div className="w-24 h-24 rounded-full animate-spin-slow"
              style={{
                background: "conic-gradient(from 0deg, #7c3aed, #0891b2, #22d3ee, #7c3aed)",
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
                <span className="text-2xl font-extrabold gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  AG
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #7c3aed, #22d3ee)", width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <p className="text-xs text-white/40 tracking-widest uppercase font-medium">
            Loading{".".repeat(Math.floor(progress / 33) + 1)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
