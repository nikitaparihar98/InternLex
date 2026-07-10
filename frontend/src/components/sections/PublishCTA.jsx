import { Link } from "react-router-dom";

function PublishCTA() {
  return (
    <section style={{ backgroundColor: "#111111", padding: "5rem 0", textAlign: "center", color: "#FFFFFF" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 2.5rem)" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 600, marginBottom: "1rem" }}>
          Want to Publish with InternLex?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#E5E7EB", marginBottom: "3rem", lineHeight: 1.6 }}>
          Share your legal knowledge, opportunities and insights with the community.
        </p>
        <Link
          to="/submit-post"
          style={{
            display: "inline-block",
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "#111111",
            backgroundColor: "#D4A843",
            textDecoration: "none",
            padding: "1rem 2.5rem",
            borderRadius: "50px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(212,168,67,0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#B8871B";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,67,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#D4A843";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(212,168,67,0.3)";
          }}
        >
          Submit a Post
        </Link>
      </div>
    </section>
  );
}

export default PublishCTA;
