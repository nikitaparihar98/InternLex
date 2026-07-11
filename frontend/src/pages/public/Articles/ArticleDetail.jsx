import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getArticles } from "../../../services/contentApi";
import { getImageUrl } from "../../../utils/imageUrl";
import Footer from "../../../components/layout/Footer";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getArticles();
        const found = data.find((a) => a.id === parseInt(id));
        setArticle(found);
      } catch (error) {
        console.error("Failed to load article", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F9F9F9" }}>
        <p style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#F9F9F9" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", marginBottom: "1rem" }}>Article Not Found</h2>
        <Link to="/articles" style={{ color: "#B8871B", fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>← Back to Articles</Link>
      </div>
    );
  }

  return (
    <>
      <main style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", paddingTop: "120px", paddingBottom: "80px" }}>
        <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2.5rem)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/articles" style={{ display: "inline-block", color: "#6B7280", fontFamily: "'Inter', sans-serif", fontSize: "14px", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#111111"} onMouseLeave={(e) => e.target.style.color = "#6B7280"}>
              ← Back to all articles
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8871B" }}>
                Article
              </span>
              <span style={{ fontSize: "13px", color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
                {article.publication_date ? new Date(article.publication_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently"}
              </span>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 600, color: "#111111", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
              {article.title}
            </h1>

            {article.author && (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#EDE7DC", display: "flex", justifyContent: "center", alignItems: "center", color: "#8A650F", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#111111" }}>{article.author}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B7280" }}>Author</div>
                </div>
              </div>
            )}
          </motion.div>

          {article.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ width: "100%", marginBottom: "4rem", backgroundColor: "#F8F6F1", borderRadius: "12px", overflow: "hidden", display: "flex", justifyContent: "center" }}
            >
              <img
                src={getImageUrl(article.image)}
                alt={article.title}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "700px", objectFit: "contain" }}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rich-text-content"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "#374151", lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

        </article>
      </main>
      <Footer />
    </>
  );
}

export default ArticleDetail;
