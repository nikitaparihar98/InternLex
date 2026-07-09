import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",              to: "/" },
  { label: "Opportunities",     to: "/opportunities" },
  { label: "Articles",          to: "/articles" },
  { label: "Case Commentaries", to: "/case-commentaries" },
  { label: "About",             to: "/about" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid #DDD5C5",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none",
          transition: "box-shadow 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left section: Hamburger + Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
                padding: "8px",
                marginLeft: "-8px",
              }}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>

            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#111111",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              <img src="/logo.png" alt="InternLex Logo" style={{ width: "28px", height: "auto" }} />
              <span>Intern<span style={{ color: "#B8871B" }}>Lex</span></span>
            </Link>
          </div>

          {/* Right section: Submit Post Button */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/submit-post"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "#D4A843",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "50px",
                transition: "background-color 0.2s, transform 0.2s",
                boxShadow: "0 2px 8px rgba(212,168,67,0.3)",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#B8871B";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#D4A843";
                e.currentTarget.style.transform = "none";
              }}
            >
              Submit Post
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(2px)",
                zIndex: 1000,
              }}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "280px",
                maxWidth: "85vw",
                backgroundColor: "#FFFFFF",
                zIndex: 1001,
                boxShadow: "4px 0 24px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #DDD5C5",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem", borderBottom: "1px solid #F3F4F6" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#111111", letterSpacing: "-0.01em" }}>
                  <img src="/logo.png" alt="InternLex Logo" style={{ width: "28px", height: "auto" }} />
                  <span>Intern<span style={{ color: "#B8871B" }}>Lex</span></span>
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex", padding: "4px" }}
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {NAV_LINKS.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        fontWeight: active ? 600 : 500,
                        color: active ? "#B8871B" : "#4B5563",
                        textDecoration: "none",
                        padding: "0.85rem 1rem",
                        borderRadius: "8px",
                        backgroundColor: active ? "#FDFBF7" : "transparent",
                        transition: "background-color 0.2s, color 0.2s",
                        display: "block"
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                          e.currentTarget.style.color = "#111111";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#4B5563";
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>


            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;