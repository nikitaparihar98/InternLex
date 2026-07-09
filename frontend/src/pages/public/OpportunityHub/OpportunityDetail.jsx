import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getOpportunity, applyToOpportunity } from "../../../services/contentApi";
import { getImageUrl } from "../../../utils/imageUrl";
import Footer from "../../../components/layout/Footer";

const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 12px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  backgroundColor: "#F3E7C8",
  color: "#8A650F",
  borderRadius: "4px",
  fontFamily: "'Inter', sans-serif",
  marginBottom: "1rem"
};

function OpportunityDetail() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOpportunity(id);
        setOpportunity(data);
      } catch (error) {
        console.error("Failed to fetch opportunity", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F1EA" }}>
        <p style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Loading opportunity details...</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F1EA" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", color: "#111111" }}>Opportunity Not Found</h2>
        <Link to="/opportunities" style={{ marginTop: "1rem", color: "#B8871B", fontFamily: "'Inter', sans-serif", fontWeight: 600, textDecoration: "none" }}>← Back to Hub</Link>
      </div>
    );
  }

  return (
    <>
      <main style={{ backgroundColor: "#FDFBF7", minHeight: "100vh", paddingTop: "120px", paddingBottom: "100px" }}>
        <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          <Link to="/opportunities" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#111"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
            ← Back to Opportunities
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={badgeStyle}>{opportunity.type}</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 600, color: "#111111", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
              {opportunity.title}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid #E5E0D8" }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Organization</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#111111", margin: 0, fontWeight: 500 }}>{opportunity.organization}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Location / Mode</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#111111", margin: 0, fontWeight: 500 }}>{opportunity.location || "N/A"} • {opportunity.mode}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Deadline</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#B8871B", margin: 0, fontWeight: 600 }}>{new Date(opportunity.deadline).toLocaleDateString()}</p>
              </div>
            </div>

            {opportunity.banner_image && (
              <div style={{ marginBottom: "3rem", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", backgroundColor: "#F8F6F1", display: "flex", justifyContent: "center" }}>
                <img 
                  src={getImageUrl(opportunity.banner_image)} 
                  alt={opportunity.title} 
                  style={{ width: "100%", height: "auto", display: "block", maxHeight: "700px", objectFit: "contain" }} 
                />
              </div>
            )}

            <div 
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#4B5563", lineHeight: 1.8, marginBottom: "4rem" }}
              dangerouslySetInnerHTML={{ __html: opportunity.description }}
            />

            {opportunity.eligibility && (
              <div style={{ marginBottom: "3rem", padding: "2rem", backgroundColor: "#F3E7C8", borderRadius: "8px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", color: "#8A650F", margin: "0 0 1rem" }}>Eligibility Criteria</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#8A650F", margin: 0, lineHeight: 1.7 }}>
                  {opportunity.eligibility}
                </p>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid #E5E0D8" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", color: "#111111", marginBottom: "2rem" }}>Ready to apply?</h3>
              {opportunity.status === "Closed" ? (
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#E5E7EB",
                    color: "#6B7280",
                    padding: "1rem 2.5rem",
                    borderRadius: "50px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "not-allowed"
                  }}
                >
                  Closed Now
                </div>
              ) : opportunity.apply_link ? (
                <motion.a
                  href={opportunity.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: ["0px 4px 10px rgba(212, 168, 67, 0.2)", "0px 4px 24px rgba(212, 168, 67, 0.6)", "0px 4px 10px rgba(212, 168, 67, 0.2)"]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#D4A843",
                    color: "#FFFFFF",
                    padding: "1rem 2.5rem",
                    borderRadius: "50px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Click to Apply
                </motion.a>
              ) : (
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B7280" }}>Application link is currently unavailable.</p>
              )}
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default OpportunityDetail;
