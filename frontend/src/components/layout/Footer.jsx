import { Link } from "react-router-dom";

const footerLink = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#9CA3AF",
  textDecoration: "none",
  lineHeight: 1.2,
  transition: "color 0.2s",
};

const colHeading = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#FFFFFF",
  marginBottom: "1.25rem",
  marginTop: 0,
};

function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C1C1C", color: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem clamp(1rem, 5vw, 2.5rem) 1rem",
        }}
      >
        {/* 3-column flex container */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "2rem",
            paddingBottom: "2.5rem",
          }}
        >
          {/* Brand column */}
          <div style={{ flex: "1 1 260px", maxWidth: "450px", minWidth: 0 }}>
            <div>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  marginBottom: "1.5rem"
                }}
              >
                <img src="/logo.png" alt="InternLex Logo" style={{ width: "28px", height: "auto" }} />
                <span>Intern<span style={{ color: "#D4A843" }}>Lex</span></span>
              </Link>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#9CA3AF",
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: "380px",
                }}
              >
                InternLex is a platform dedicated to developing the next generation of legal professionals. We provide practical exposure through workshops, internships, and skill-based learning experiences. Building legal knowledge beyond classrooms.
              </p>
            </div>
          </div>

          {/* Explore */}
          <div style={{ flex: "1 1 120px", minWidth: 0 }}>
            <p style={colHeading}>Explore</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li><Link to="/articles" style={footerLink} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>Legal Articles</Link></li>
              <li><Link to="/case-commentaries" style={footerLink} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>Case Commentaries</Link></li>
              <li><Link to="/blogs" style={footerLink} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>Blogs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div style={{ flex: "1 1 160px", minWidth: 0 }}>
            <p style={colHeading}>Contact</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li>
                <a href="https://www.instagram.com/internlex?igsh=MXhpeGpsaHFndGpxbA%3D%3D" target="_blank" rel="noreferrer" style={{ ...footerLink, display: "flex", alignItems: "center", gap: "10px" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@internlex?si=ANIQ_Deevgq0oVrY" target="_blank" rel="noreferrer" style={{ ...footerLink, display: "flex", alignItems: "center", gap: "10px" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://whatsapp.com/channel/0029VbCGfQ3DTkK73tPQPJ3C" target="_blank" rel="noreferrer" style={{ ...footerLink, display: "flex", alignItems: "center", gap: "10px" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 3.4L3 21"/>
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:team.internlex@gmail.com" style={{ ...footerLink, display: "flex", alignItems: "center", gap: "10px" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  team.internlex@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/internlex/" target="_blank" rel="noreferrer" style={{ ...footerLink, display: "flex", alignItems: "center", gap: "10px" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#9CA3AF"}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #333333",
            paddingTop: "1.5rem",
            paddingBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#6B7280",
              margin: 0,
            }}
          >
            © 2026 InternLex. All rights reserved. Professional Legal Consultancy.
          </p>
          <div style={{ display: "flex" }}>
            <Link
              to="/privacy"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#6B7280",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}
            >
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;