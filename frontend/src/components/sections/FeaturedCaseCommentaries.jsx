import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCaseCommentaries } from "../../services/contentApi";
import { getImageUrl } from "../../utils/imageUrl";

function FeaturedCaseCommentaries() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCaseCommentaries();
        const published = data.filter(a => a.status === "Published");
        const sorted = published.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setCases(sorted.slice(0, 2));
      } catch (error) {
        console.error("Failed to load featured case commentaries", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading || cases.length === 0) return null;

  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "5rem 0 3rem" }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="responsive-container"
      >

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#B8871B",
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#111111",
                  margin: 0,
                }}
              >
                Case Commentaries
              </h2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7280", margin: "1rem 0 0", maxWidth: "500px" }}>
              Explore concise analysis of landmark judgments and critical legal precedents.
            </p>
          </div>
          <Link
            to="/case-commentaries"
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
            View All
          </Link>
        </div>

        {/* 2-column card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {cases.map((commentary) => (
            <article
              key={commentary.id}
              style={{
                border: "1px solid #DDD5C5",
                backgroundColor: "#FFFFFF",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              {commentary.image && (
                <div style={{ height: "250px", overflow: "hidden", backgroundColor: "#F8F6F1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img
                    src={getImageUrl(commentary.image)}
                    alt={commentary.title}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
              )}

              {/* Body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "auto" }}>
                  <span
                    style={{
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
                    }}
                  >
                    {commentary.court || "Supreme Court"}
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      color: "#111111",
                      lineHeight: 1.25,
                      marginTop: "0.9rem",
                      marginBottom: 0,
                    }}
                  >
                    {commentary.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#6B7280",
                      lineHeight: 1.7,
                      marginTop: "0.65rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {commentary.content ? commentary.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().substring(0, 150) + "..." : ""}
                  </p>
                </div>

                <Link
                  to="/case-commentaries"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "1.1rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111111",
                    textDecoration: "none",
                  }}
                >
                  Read Commentary <span style={{ color: "#B8871B", fontSize: "14px" }}>›</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default FeaturedCaseCommentaries;