import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../../components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <main
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FDFBF7",
          padding: "140px 1.5rem 80px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "560px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8871B",
              marginBottom: "1rem",
            }}
          >
            Error 404
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
              fontWeight: 600,
              color: "#111111",
              margin: "0 0 1rem",
              lineHeight: 1.1,
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              color: "#6B7280",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            The legal publication, opportunity, or resource you are looking for
            could not be located. It may have been moved, renamed, or is no longer available.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              to="/"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "#111111",
                padding: "0.85rem 2rem",
                borderRadius: "50px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#B8871B";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#111111";
                e.currentTarget.style.transform = "none";
              }}
            >
              Return Home
            </Link>

            <Link
              to="/opportunities"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#111111",
                backgroundColor: "#FFFFFF",
                border: "1px solid #DDD5C5",
                padding: "0.85rem 2rem",
                borderRadius: "50px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B8871B";
                e.currentTarget.style.color = "#B8871B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#DDD5C5";
                e.currentTarget.style.color = "#111111";
              }}
            >
              Browse Opportunities
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
