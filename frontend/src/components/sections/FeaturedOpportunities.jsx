import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getOpportunities } from "../../services/contentApi";

const badge = {
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  backgroundColor: "#F3E7C8",
  color: "#8A650F",
  borderRadius: "3px",
  fontFamily: "'Inter', sans-serif",
  flexShrink: 0,
  marginTop: "2px",
};

function FeaturedOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOpportunities();
        const published = data.filter(o => o.status === "Published");
        const sorted = published.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setOpportunities(sorted.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured opportunities", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading || opportunities.length === 0) return null;

  return (
    <section style={{ backgroundColor: "#F5F1EA", padding: "5rem 0" }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem" }}
      >

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "#111111",
              margin: 0,
            }}
          >
            Featured Opportunities
          </h2>
          <Link
            to="/opportunities"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B7280",
              textDecoration: "none",
            }}
          >
            Browse All
          </Link>
        </div>

        {/* Rows */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #DDD5C5",
          }}
        >
          {opportunities.map((item, index) => (
            <div
              key={item.id}
              className="featured-opp-item"
              style={{
                borderBottom: index < opportunities.length - 1 ? "1px solid #DDD5C5" : "none",
                borderLeft: index === 0 ? "3px solid #B8871B" : "3px solid transparent", // Highlight the first one
              }}
            >
              {/* Left — badge + title + org */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", flex: 1, minWidth: 0 }}>
                <span style={badge}>{item.type}</span>
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: "#111111",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: "3px 0 0",
                    }}
                  >
                    {item.organization}
                  </p>
                </div>
              </div>

              {/* Right — location + CTA */}
              <div className="featured-opp-right">
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#6B7280",
                      margin: 0,
                    }}
                  >
                    Location
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#333333",
                      margin: "2px 0 0",
                    }}
                  >
                    {item.location}
                  </p>
                </div>
                <Link
                  to="/opportunities"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111111",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  View Details <span style={{ color: "#B8871B", fontSize: "14px" }}>›</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default FeaturedOpportunities;