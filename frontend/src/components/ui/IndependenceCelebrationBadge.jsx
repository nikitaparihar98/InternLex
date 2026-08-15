import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * IndependenceCelebrationBadge
 * A subtle, floating luxury celebratory badge pinned at the bottom-right.
 * Allows users to replay the flag hoisting & celebration whenever they wish.
 */
export default function IndependenceCelebrationBadge() {
  const [hovered, setHovered] = useState(false);

  const handleReplay = () => {
    window.dispatchEvent(new CustomEvent("internlex:replay-celebration"));
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 999,
      }}
    >
      <motion.button
        onClick={handleReplay}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          background: "linear-gradient(135deg, rgba(20, 20, 20, 0.92) 0%, rgba(28, 28, 28, 0.95) 100%)",
          border: "1px solid #D4A843",
          borderRadius: "50px",
          boxShadow: hovered
            ? "0 8px 24px rgba(212, 168, 67, 0.35), 0 0 12px rgba(255, 103, 31, 0.2)"
            : "0 4px 16px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          outline: "none",
        }}
        aria-label="Celebrate Independence Day"
        title="Click to hoist flag and celebrate"
      >
        {/* Animated Tricolor Indian Flag Dot */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "linear-gradient(180deg, #FF671F 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #046A38 66.6%)",
            boxShadow: "0 0 8px rgba(212, 168, 67, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            fontSize: "10px",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#000080",
            }}
          />
        </span>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "#F3E7C8",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          15 Aug • Celebrate
        </span>

        <Sparkles size={13} color="#D4A843" />
      </motion.button>
    </div>
  );
}
