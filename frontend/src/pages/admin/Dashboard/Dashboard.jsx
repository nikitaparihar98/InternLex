import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { 
  getOpportunities, 
  getArticles, 
  getBlogs,
  getCaseCommentaries
} from "../../../services/contentApi";

function Dashboard() {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    opportunities: 0,
    articles: 0,
    blogs: 0,
    caseCommentaries: 0
  });

  const [recentOpportunities, setRecentOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [opps, articles, blogs, caseCommentaries] = await Promise.all([
          getOpportunities(),
          getArticles(),
          getBlogs(),
          getCaseCommentaries()
        ]);

        setStats({
          opportunities: opps.length,
          articles: articles.length,
          blogs: blogs.length,
          caseCommentaries: caseCommentaries.length
        });

        // Get last 5 opportunities
        const sortedOpps = opps.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
        setRecentOpportunities(sortedOpps);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const statsList = [
    { label: "Opportunities", value: stats.opportunities },
    { label: "Articles", value: stats.articles },
    { label: "Blogs", value: stats.blogs },
    { label: "Case Commentaries", value: stats.caseCommentaries }
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4A843", marginBottom: "0.5rem" }}>
          Dashboard
        </p>

        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 7vw, 3rem)", fontWeight: 600, color: "#111111", margin: 0 }}>
          Welcome back, Admin
        </h1>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", marginTop: "0.5rem" }}>
          Manage opportunities and content from one place.
        </p>
      </div>

      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ backgroundColor: "#F3F4F6", height: "120px", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", border: "1px solid #DDD5C5" }}></div>
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {statsList.map((item) => (
              <div
                key={item.label}
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "1.5rem" }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#6B7280", margin: 0 }}>
                  {item.label}
                </p>

                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, color: "#111111", margin: "0.5rem 0 0", lineHeight: 1 }}>
                  {item.value}
                </h2>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "1.5rem" }}>
            
            <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Removed Recent Applications */}

              {/* Recent Opportunities */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: "#111111", margin: 0 }}>
                    Recent Opportunities
                  </h2>
                  <button onClick={() => navigate("/admin/opportunities")} style={{ background: "none", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#B8871B", cursor: "pointer" }}>
                    View All →
                  </button>
                </div>
                <div>
                  {recentOpportunities.length === 0 ? (
                    <p style={{ color: "#6B7280", fontSize: "14px", textAlign: "center", padding: "1rem" }}>No opportunities posted yet.</p>
                  ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody>
                        {recentOpportunities.map((item, index) => (
                          <tr key={index} style={{ borderBottom: index < recentOpportunities.length - 1 ? "1px solid #DDD5C5" : "none" }}>
                            <td style={{ padding: "1rem 0", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#111111" }}>{item.title}</td>
                            <td style={{ padding: "1rem 0", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280" }}>{item.organization}</td>
                            <td style={{ padding: "1rem 0", textAlign: "right" }}>
                              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, padding: "0.25rem 0.5rem", borderRadius: "9999px", backgroundColor: item.status === "Published" ? "#D1FAE5" : "#F3F4F6", color: item.status === "Published" ? "#065F46" : "#374151" }}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "1.5rem", height: "fit-content" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: "#111111", margin: "0 0 1.5rem" }}>
                Quick Actions
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <button onClick={() => navigate("/admin/opportunities")} style={{ width: "100%", backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.85rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B8871B"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#111111"}>
                  Add Opportunity
                </button>

                <button onClick={() => navigate("/admin/articles")} style={{ width: "100%", backgroundColor: "transparent", color: "#111111", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.85rem", border: "1px solid #DDD5C5", cursor: "pointer", transition: "border-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#B8871B"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "#DDD5C5"}>
                  Create Article
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export default Dashboard;