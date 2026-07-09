import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogs } from "../../services/contentApi";
import { getImageUrl } from "../../utils/imageUrl";

function FeaturedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlogs();
        const published = data.filter(a => a.status === "Published");
        const sorted = published.sort((a, b) => new Date(b.publication_date || b.created_at || 0) - new Date(a.publication_date || a.created_at || 0));
        setBlogs(sorted.slice(0, 2));
      } catch (error) {
        console.error("Failed to load featured blogs", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading || blogs.length === 0) return null;

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
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
              Featured Blogs
            </h2>
          </div>
          <Link
            to="/blogs"
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {blogs.map((blog) => (
            <article
              key={blog.id}
              style={{
                border: "1px solid #DDD5C5",
                backgroundColor: "#FFFFFF",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              {blog.image && (
                <div style={{ height: "220px", overflow: "hidden", backgroundColor: "#EDE7DC" }}>
                  <img
                    src={getImageUrl(blog.image)}
                    alt={blog.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                    {blog.publication_date ? new Date(blog.publication_date).toLocaleDateString() : "Recently"}
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
                    {blog.title}
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
                    {blog.description}
                  </p>
                </div>

                <Link
                  to={`/blogs/${blog.id}`}
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
                  Read Blog <span style={{ color: "#B8871B", fontSize: "14px" }}>›</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default FeaturedBlogs;