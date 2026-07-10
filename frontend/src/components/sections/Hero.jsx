import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.jpg";

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "92vh",
        overflow: "hidden",
        backgroundColor: "#141414",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background image */}
      <img
        src={heroImage}
        alt="Lady Justice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center right",
          filter: "brightness(0.5) contrast(1.08)",
        }}
      />

      {/* Left gradient for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(110deg, rgba(14,14,14,0.96) 0%, rgba(14,14,14,0.80) 42%, rgba(14,14,14,0.15) 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to top, rgba(14,14,14,0.6), transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 5vw, 2.5rem)",
          paddingTop: "80px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "620px", paddingTop: "2rem", paddingBottom: "4rem" }}>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Empowering Legal Minds Through Internships.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginTop: "1.75rem",
              maxWidth: "500px",
            }}
          >
            Discover internships, legal articles, case commentaries, competitions
            and webinars — built exclusively for India's future lawyers.
          </p>

          {/* CTA Buttons */}
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              to="/opportunities"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.85rem 1.75rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#111111",
                backgroundColor: "#D4A843",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background-color 0.2s ease",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#B8871B";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#D4A843";
                e.currentTarget.style.color = "#111111";
              }}
            >
              Explore Opportunities
            </Link>

            <Link
              to="/articles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.85rem 1.75rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.45)",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#D4A843";
                e.currentTarget.style.color = "#D4A843";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
            >
              Read the Journal
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;