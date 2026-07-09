import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCaseCommentaries } from "../../../services/contentApi";
import Footer from "../../../components/layout/Footer";

const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/>
    <path d="M12 3v18"/>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

function CaseCommentaries() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = cases.filter(item => 
    (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    async function fetchCases() {
      try {
        const data = await getCaseCommentaries();
        const published = data.filter(a => a.status === "Published");
        published.sort((a, b) => {
          const dateA = new Date(a.publication_date || a.created_at || 0);
          const dateB = new Date(b.publication_date || b.created_at || 0);
          return dateB - dateA;
        });
        setCases(published);
      } catch (error) {
        console.error("Failed to load case commentaries", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCases();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <main style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 2.5rem)" }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "4rem", textAlign: "center" }}
          >
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 600, color: "#111111", margin: 0 }}>
              Case Commentaries
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 0" }}>
              Concise commentaries of landmark judgments, legal precedents, and judicial interpretations.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div style={{ maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            <div style={{ position: "relative" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search case commentaries..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  borderRadius: "50px",
                  border: "1px solid #DDD5C5",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  outline: "none",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#B8871B";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(184, 135, 27, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#DDD5C5";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
                }}
              />
            </div>
          </div>

          <div style={{ minHeight: "400px" }}>
            {isLoading ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0" }}>Loading case commentaries...</div>
            ) : cases.length === 0 ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0" }}>No case commentaries available at the moment.</div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                {filteredCases.map((commentary, index) => {
                  const isExpanded = expandedId === commentary.id;
                  
                  return (
                    <motion.div
                      key={commentary.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid",
                        borderColor: isExpanded ? "#B8871B" : "#E5E0D8",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: isExpanded ? "0 4px 12px rgba(184, 135, 27, 0.08)" : "0 2px 4px rgba(0,0,0,0.02)",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease"
                      }}
                    >
                      <div 
                        onClick={() => toggleExpand(commentary.id)}
                        style={{
                          padding: "1.5rem",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          userSelect: "none"
                        }}
                      >
                        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                          <div style={{
                            backgroundColor: "#FDFBF7",
                            color: "#B8871B",
                            border: "1px solid #E5E0D8",
                            borderRadius: "8px",
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}>
                            <ScaleIcon />
                          </div>
                          <div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#111111", margin: "0 0 0.35rem", lineHeight: 1.2 }}>
                              {commentary.title}
                            </h2>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280", margin: 0 }}>
                              {commentary.publication_date ? new Date(commentary.publication_date).toISOString().split('T')[0] : "Recent"} 
                              {commentary.author && ` • By ${commentary.author}`}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ color: "#111111", padding: "0.5rem" }}
                        >
                          <ChevronDown />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div style={{ padding: "0 1.5rem 1.5rem", borderTop: "1px solid #E5E0D8", marginTop: "0.5rem", paddingTop: "1.5rem" }}>
                              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#4B5563", lineHeight: 1.7, marginBottom: "2rem", whiteSpace: "pre-line" }}>
                                {commentary.description || commentary.content?.substring(0, 300) + "..."}
                              </div>
                              
                              <Link
                                to={`/case-commentaries/${commentary.id}`}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  backgroundColor: "#D4A843",
                                  color: "#FFFFFF",
                                  padding: "0.75rem 1.5rem",
                                  borderRadius: "8px",
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  textDecoration: "none",
                                  transition: "transform 0.2s, background-color 0.2s"
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#B8871B";
                                  e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#D4A843";
                                  e.currentTarget.style.transform = "translateY(0)";
                                }}
                              >
                                <DocIcon />
                                Full Commentary
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Publish Link */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", color: "#111111", marginBottom: "1rem" }}>Share Your Manuscript</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
              Join our growing community of legal minds. Submit your case commentaries for publication.
            </p>
            <a 
              href="https://forms.gle/3ye3mZCcwRyoZR2C6" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#111111",
                color: "#FFFFFF",
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                padding: "1rem 2.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#B8871B";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(184, 135, 27, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#111111";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }}
            >
              Publish with InternLex
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default CaseCommentaries;