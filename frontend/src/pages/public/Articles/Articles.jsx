import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getArticles, getBlogs } from "../../../services/contentApi";
import { getImageUrl } from "../../../utils/imageUrl";
import Footer from "../../../components/layout/Footer";

function ArticleCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
      }}
    >
      <div
        className="animate-pulse"
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#EDE8DF",
        }}
      />
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div className="animate-pulse" style={{ width: "65px", height: "14px", backgroundColor: "#EDE8DF", borderRadius: "3px" }} />
          <div className="animate-pulse" style={{ width: "85px", height: "12px", backgroundColor: "#F3EFE8", borderRadius: "3px" }} />
        </div>
        <div className="animate-pulse" style={{ width: "90%", height: "20px", backgroundColor: "#E5DFD3", borderRadius: "4px", marginBottom: "0.6rem" }} />
        <div className="animate-pulse" style={{ width: "60%", height: "20px", backgroundColor: "#E5DFD3", borderRadius: "4px", marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem", marginTop: "auto" }}>
          <div className="animate-pulse" style={{ width: "100px", height: "14px", backgroundColor: "#F3EFE8", borderRadius: "3px" }} />
          <div className="animate-pulse" style={{ width: "70px", height: "14px", backgroundColor: "#EDE8DF", borderRadius: "3px" }} />
        </div>
      </div>
    </div>
  );
}

function Articles() {
  const [activeTab, setActiveTab] = useState("articles"); // "articles" or "blogs"
  const [tabData, setTabData] = useState({ articles: null, blogs: null });
  const [searchQuery, setSearchQuery] = useState("");

  const currentItems = tabData[activeTab];
  const isLoading = currentItems === null;

  const filteredItems = (currentItems || []).filter(item => 
    (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    let isMounted = true;

    // Load active tab if not yet loaded
    if (!tabData[activeTab]) {
      const fetcher = activeTab === "articles" ? getArticles : getBlogs;
      fetcher()
        .then(data => {
          if (!isMounted) return;
          const published = (data || []).filter(item => item.status === "Published");
          published.sort((a, b) => {
            const dateA = new Date(a.publication_date || a.created_at || 0);
            const dateB = new Date(b.publication_date || b.created_at || 0);
            return dateB - dateA;
          });
          setTabData(prev => ({ ...prev, [activeTab]: published }));
        })
        .catch(err => {
          console.error(`Failed to load ${activeTab}`, err);
          if (isMounted) setTabData(prev => ({ ...prev, [activeTab]: [] }));
        });
    }

    // Background prefetch the alternative tab so switching tabs is instant (0ms)
    const otherTab = activeTab === "articles" ? "blogs" : "articles";
    if (!tabData[otherTab]) {
      const otherFetcher = otherTab === "articles" ? getArticles : getBlogs;
      otherFetcher()
        .then(data => {
          if (!isMounted) return;
          const published = (data || []).filter(item => item.status === "Published");
          published.sort((a, b) => {
            const dateA = new Date(a.publication_date || a.created_at || 0);
            const dateB = new Date(b.publication_date || b.created_at || 0);
            return dateB - dateA;
          });
          setTabData(prev => ({ ...prev, [otherTab]: published }));
        })
        .catch(err => console.debug("Silent prefetch failed", err));
    }

    return () => { isMounted = false; };
  }, [activeTab, tabData]);

  return (
    <>
      <main style={{ minHeight: "100vh", backgroundColor: "#F9F9F9", paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 2.5rem)" }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.25rem, 8vw, 3.5rem)", fontWeight: 600, color: "#111111", margin: 0 }}>
              Legal Knowledge Hub
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 0" }}>
              Explore practical legal insights and community perspectives curated for legal professionals.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
            <div style={{ position: "relative" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
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
                  e.currentTarget.style.borderColor = "#D4A843";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212, 168, 67, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#DDD5C5";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "4rem" }}>
            <button
              onClick={() => setActiveTab("articles")}
              style={{
                padding: "0.75rem 2.5rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "50px",
                cursor: "pointer",
                backgroundColor: activeTab === "articles" ? "#111111" : "#FFFFFF",
                color: activeTab === "articles" ? "#FFFFFF" : "#6B7280",
                border: activeTab === "articles" ? "1px solid #111111" : "1px solid #DDD5C5",
                transition: "all 0.3s ease",
                boxShadow: activeTab === "articles" ? "0 4px 14px rgba(0,0,0,0.1)" : "none"
              }}
            >
              Legal Articles
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              style={{
                padding: "0.75rem 2.5rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "50px",
                cursor: "pointer",
                backgroundColor: activeTab === "blogs" ? "#111111" : "#FFFFFF",
                color: activeTab === "blogs" ? "#FFFFFF" : "#6B7280",
                border: activeTab === "blogs" ? "1px solid #111111" : "1px solid #DDD5C5",
                transition: "all 0.3s ease",
                boxShadow: activeTab === "blogs" ? "0 4px 14px rgba(0,0,0,0.1)" : "none"
              }}
            >
              Legal Blogs
            </button>
          </div>

          <div style={{ minHeight: "400px" }}>
            {isLoading ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))", gap: "2.5rem" }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ArticleCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0" }}>
                {searchQuery ? `No ${activeTab} match your search query.` : `No ${activeTab} available at the moment.`}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))", gap: "2.5rem" }}
                >
                  {filteredItems.map((item, index) => (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      key={item.id}
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.02)";
                      }}
                    >
                      <Link 
                        to={`/${activeTab}/${item.id}`} 
                        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%", flex: 1 }}
                      >
                        {item.image && (
                          <div style={{ backgroundColor: "#F8F6F1", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                              style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                          </div>
                        )}
                        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8871B" }}>
                              {activeTab === "articles" ? "Article" : "Blog"}
                            </span>
                            <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
                              {item.publication_date ? new Date(item.publication_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently"}
                            </span>
                          </div>
                          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: "#111111", margin: "0 0 1rem", lineHeight: 1.2 }}>
                            {item.title}
                          </h2>
                          
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem", marginTop: "auto" }}>
                            {item.author && (
                              <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                                By <span style={{ color: "#111111" }}>{item.author}</span>
                              </span>
                            )}
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#B8871B",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px"
                              }}
                            >
                              Read Full <span style={{ fontSize: "16px" }}>→</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Publish Link */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", color: "#111111", marginBottom: "1rem" }}>Share Your Manuscript</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
              Join our growing community of legal minds. Submit your well-researched articles and blogs for publication.
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

export default Articles;