import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogs } from "../../../services/contentApi";
import { getImageUrl } from "../../../utils/imageUrl";
import Footer from "../../../components/layout/Footer";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        // Show only published ones
        setBlogs(data.filter(a => a.status === "Published"));
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

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
              Legal Blogs
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 0" }}>
              Career guidance and practical advice for aspiring legal professionals.
            </p>
          </motion.div>

          <div style={{ minHeight: "400px" }}>
            {isLoading ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0" }}>Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0" }}>No blogs published yet.</div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))", gap: "2.5rem" }}
              >
                {blogs.map((blog, index) => (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={blog.id}
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
                      to={`/blogs/${blog.id}`} 
                      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%", flex: 1 }}
                    >
                      {blog.image && (
                        <div style={{ backgroundColor: "#F8F6F1", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <img
                            src={getImageUrl(blog.image)}
                            alt={blog.title}
                            style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                          />
                        </div>
                      )}
                      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8871B" }}>
                            Blog
                          </span>
                          <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
                            {blog.publication_date ? new Date(blog.publication_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently"}
                          </span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: "#111111", margin: "0 0 1rem", lineHeight: 1.2 }}>
                          {blog.title}
                        </h2>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F3F4F6", paddingTop: "1.5rem", marginTop: "auto" }}>
                          {blog.author && (
                            <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                              By <span style={{ color: "#111111" }}>{blog.author}</span>
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
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default Blogs;