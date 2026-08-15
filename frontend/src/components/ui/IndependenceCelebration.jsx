import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

/**
 * IndependenceCelebration Component
 * A cinematic, grand Indian Independence Day celebration intro for InternLex.
 * Features:
 * - Radiant Tricolor Aurora & Golden Atmospheric Glow
 * - Majestic Glowing Ashoka Chakra Crest with expanding Tricolor Silk Ribbons
 * - Celebratory Fireworks Burst & Floating Flower Petals (Pushpa Vrishti)
 * - Constitutional Preamble Tribute in Cormorant Garamond serif
 * - Smooth auto-dismissal into the website after a timed celebration
 */
export default function IndependenceCelebration() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  // Check sessionStorage so it triggers on first opening of the session
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("internlex_ind_day_celebrated_2026");
    if (!hasSeen) {
      setIsVisible(true);
      sessionStorage.setItem("internlex_ind_day_celebrated_2026", "true");
    }
  }, []);

  // Listen for custom trigger event (from floating replay badge)
  useEffect(() => {
    const handleReplay = () => {
      setProgress(100);
      setIsVisible(true);
    };
    window.addEventListener("internlex:replay-celebration", handleReplay);
    return () => window.removeEventListener("internlex:replay-celebration", handleReplay);
  }, []);

  // Animation timeline & Particle Physics
  useEffect(() => {
    if (!isVisible) return;

    setProgress(100);

    // Trigger celebration fireworks & flower petals
    initParticleShow();

    // Auto-dismiss countdown (total duration ~5.8 seconds)
    const totalDuration = 5800; // 5.8s
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / totalDuration) * 100);
      setProgress(remainingPct);

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
        setIsVisible(false);
      }
    }, 35);

    return () => {
      clearInterval(progressInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Particle System: Tricolor Fireworks & Floating Flower Petals
  const initParticleShow = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#FF671F", // Saffron
      "#FFA500", // Vibrant Saffron / Orange
      "#FFFFFF", // Jasmine White
      "#F5F1EA", // Legal Cream
      "#046A38", // India Green
      "#138808", // Emerald Green
      "#D4A843", // Brass Gold
      "#FFD700", // Sparkle Gold
      "#000080", // Navy Blue
    ];

    const particles = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.38;

    // 1. Initial Grand Firework / Sparkle Radial Burst (120 particles)
    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 * i) / 120 + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 11 + 3;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.6),
        vy: Math.sin(angle) * speed * (0.8 + Math.random() * 0.6),
        gravity: 0.08,
        friction: 0.965,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        fadeSpeed: Math.random() * 0.012 + 0.008,
        type: "spark",
        rotation: 0,
        vRot: 0,
      });
    }

    // 2. Secondary side bursts (Left & Right fireworks after 500ms)
    setTimeout(() => {
      if (!canvasRef.current) return;
      for (let i = 0; i < 70; i++) {
        const leftBurstX = window.innerWidth * 0.25;
        const rightBurstX = window.innerWidth * 0.75;
        const burstY = window.innerHeight * 0.3;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;

        // Left burst (Saffron & Gold)
        particles.push({
          x: leftBurstX,
          y: burstY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.07,
          friction: 0.965,
          size: Math.random() * 4 + 2,
          color: Math.random() > 0.4 ? "#FF671F" : "#D4A843",
          opacity: 1,
          fadeSpeed: 0.012,
          type: "spark",
          rotation: 0,
          vRot: 0,
        });

        // Right burst (Green & White)
        particles.push({
          x: rightBurstX,
          y: burstY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.07,
          friction: 0.965,
          size: Math.random() * 4 + 2,
          color: Math.random() > 0.4 ? "#046A38" : "#FFFFFF",
          opacity: 1,
          fadeSpeed: 0.012,
          type: "spark",
          rotation: 0,
          vRot: 0,
        });
      }
    }, 500);

    // 3. Floating Flower Petals (Pushpa Vrishti) descending from top (75 petals)
    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -Math.random() * 300 - 20,
        vx: (Math.random() - 0.5) * 1.8,
        vy: Math.random() * 2.2 + 1.2,
        gravity: 0.02,
        friction: 0.99,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * 6)], // saffron, jasmine, green
        opacity: 0.9,
        fadeSpeed: 0.002,
        type: "petal",
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 4,
        swaySpeed: Math.random() * 0.03 + 0.015,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      particlesRef.current.forEach((p) => {
        if (p.opacity <= 0.01 || p.y > canvas.height + 40) return;
        alive++;

        p.vx *= p.friction;
        p.vy += p.gravity;
        p.vy *= p.friction;

        if (p.type === "petal") {
          p.x += p.vx + Math.sin(Date.now() * p.swaySpeed + p.swayOffset) * 1.2;
          p.y += p.vy;
          p.rotation += p.vRot;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= p.fadeSpeed;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.type === "petal") {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.52, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          // Sparkling diamond
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      });

      if (alive > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="independence-celebration-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(10, 11, 14, 0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            padding: "1.5rem",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss();
          }}
        >
          {/* Canvas for Fireworks & Pushpa Vrishti Petals */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Grand Ambient Tricolor Aurora Glows */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "450px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255, 103, 31, 0.25) 0%, rgba(255, 103, 31, 0) 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "450px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(4, 106, 56, 0.25) 0%, rgba(4, 106, 56, 0) 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212, 168, 67, 0.16) 0%, rgba(0, 0, 0, 0) 70%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Top Skip / Close Bar */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <button
              onClick={handleDismiss}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#EDE7DC",
                padding: "8px 18px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212, 168, 67, 0.25)";
                e.currentTarget.style.borderColor = "#D4A843";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.color = "#EDE7DC";
              }}
            >
              <span>Enter InternLex</span>
              <ArrowRight size={13} />
            </button>

            <button
              onClick={handleDismiss}
              aria-label="Close celebration"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#D1D5DB",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#D1D5DB";
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* MAIN CELEBRATION STAGE */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "820px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Top Gold Ribbon Badge */}
            <motion.div
              initial={{ y: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                background: "linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(184,135,27,0.30) 100%)",
                border: "1px solid rgba(212, 168, 67, 0.45)",
                borderRadius: "30px",
                boxShadow: "0 0 20px rgba(212,168,67,0.2)",
                marginBottom: "2rem",
              }}
            >
              <Sparkles size={14} color="#D4A843" />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#F3E7C8",
                }}
              >
                15th August • Indian Independence Day
              </span>
              <Sparkles size={14} color="#D4A843" />
            </motion.div>

            {/* GRAND TRICOLOR CREST & ASHOKA CHAKRA EMBLEM */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "520px",
                height: "110px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              {/* Left Saffron Silk Wing Ribbon */}
              <motion.div
                initial={{ x: 60, opacity: 0, scaleX: 0.2 }}
                animate={{ x: 0, opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
                style={{
                  flex: 1,
                  height: "36px",
                  background: "linear-gradient(90deg, rgba(255, 103, 31, 0) 0%, rgba(255, 103, 31, 0.8) 60%, #FF671F 100%)",
                  borderRadius: "50px 0 0 50px",
                  boxShadow: "0 0 24px rgba(255, 103, 31, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    animation: "flagSilkShimmer 2.5s infinite",
                  }}
                />
              </motion.div>

              {/* Central Glowing Ashoka Chakra Shield */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 25px rgba(212,168,67,0.4), 0 0 45px rgba(0,0,128,0.3)",
                    "0 0 40px rgba(212,168,67,0.7), 0 0 65px rgba(255,103,31,0.4)",
                    "0 0 25px rgba(212,168,67,0.4), 0 0 45px rgba(0,0,128,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "relative",
                  width: "88px",
                  height: "88px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #D4A843",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 4,
                  margin: "0 -4px",
                  flexShrink: 0,
                }}
              >
                {/* 24-Spoke Rotating Ashoka Chakra */}
                <svg
                  width="62"
                  height="62"
                  viewBox="0 0 100 100"
                  style={{
                    animation: "rotateChakra 24s linear infinite",
                  }}
                >
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#000080" strokeWidth="5.5" />
                  <circle cx="50" cy="50" r="8" fill="#000080" />
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="8"
                        stroke="#000080"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        transform={`rotate(${angle} 50 50)`}
                      />
                    );
                  })}
                </svg>

                {/* Golden Outer Halo Ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-9px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(212, 168, 67, 0.6)",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>

              {/* Right Green Silk Wing Ribbon */}
              <motion.div
                initial={{ x: -60, opacity: 0, scaleX: 0.2 }}
                animate={{ x: 0, opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
                style={{
                  flex: 1,
                  height: "36px",
                  background: "linear-gradient(90deg, #046A38 0%, rgba(4, 106, 56, 0.8) 40%, rgba(4, 106, 56, 0) 100%)",
                  borderRadius: "0 50px 50px 0",
                  boxShadow: "0 0 24px rgba(4, 106, 56, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    animation: "flagSilkShimmer 2.5s infinite 1.2s",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Typography & Constitutional Tribute */}
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
                margin: "0 0 0.5rem 0",
                background: "linear-gradient(135deg, #FFFFFF 15%, #F7E9B8 50%, #D4A843 85%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 30px rgba(212,168,67,0.3)",
              }}
            >
              Happy Independence Day
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.25rem, 2.8vw, 1.6rem)",
                fontStyle: "italic",
                color: "#E8E2D5",
                maxWidth: "680px",
                lineHeight: 1.35,
                marginBottom: "0.85rem",
              }}
            >
              “Justice, Liberty, Equality, Fraternity”
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14.5px",
                color: "rgba(255, 255, 255, 0.75)",
                maxWidth: "540px",
                lineHeight: 1.65,
                marginBottom: "2.2rem",
              }}
            >
              Saluting the spirit of freedom and the Constitution of India. Empowering the future advocates and jurists of our nation.
            </motion.p>

            {/* Bottom Actions & Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.9rem",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              {/* Explore InternLex Button */}
              <button
                onClick={handleDismiss}
                style={{
                  width: "100%",
                  padding: "0.85rem 2rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111111",
                  backgroundColor: "#D4A843",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 6px 22px rgba(212,168,67,0.4)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#B8871B";
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(212,168,67,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4A843";
                  e.currentTarget.style.color = "#111111";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 6px 22px rgba(212,168,67,0.4)";
                }}
              >
                <span>Explore InternLex</span>
                <ArrowRight size={16} />
              </button>

              {/* Progress Indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "3px",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      backgroundColor: "#D4A843",
                      transition: "width 35ms linear",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.45)",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  Auto-entering...
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
