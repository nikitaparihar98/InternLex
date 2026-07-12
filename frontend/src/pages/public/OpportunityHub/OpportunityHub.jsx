import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../../components/layout/Footer";
import { getOpportunities } from "../../../services/contentApi";

const badgeStyle = {
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

function OpportunityHub() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All Types");

  useEffect(() => {
    async function fetchData() {
      try {
        const opps = await getOpportunities();
        const filtered = opps.filter(o => o.status === "Published" || o.status === "Closed");
        filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setOpportunities(filtered);
      } catch (error) {
        console.error("Failed to fetch opportunities", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredOpps = opportunities.filter(o => {
    if (filterType !== "All Types" && o.type !== filterType) return false;
    if (search && !o.title.toLowerCase().includes(search.toLowerCase()) && !o.organization.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <section style={{ backgroundColor: "#F5F1EA", minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 2.5rem)" }}>
          
          <div style={{ marginBottom: "3rem", maxWidth: "700px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4A843", marginBottom: "1rem" }}>
              Opportunity Hub
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.25rem, 8vw, 3.5rem)", fontWeight: 600, color: "#111111", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
              Explore Legal Opportunities
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7280", lineHeight: 1.75 }}>
              Find internships, webinars and competitions curated exclusively for the legal community. Filter by type to find the perfect match for your career goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "1.25rem", marginBottom: "2rem", gap: "1rem" }}>
            <input
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: "1px solid #DDD5C5", padding: "0.75rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }}
              onFocus={(e) => e.target.style.borderColor = "#B8871B"}
              onBlur={(e) => e.target.style.borderColor = "#DDD5C5"}
            />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-[200px]"
              style={{ border: "1px solid #DDD5C5", padding: "0.75rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "#FFFFFF", color: "#6B7280" }} 
              onFocus={(e) => e.target.style.borderColor = "#B8871B"} 
              onBlur={(e) => e.target.style.borderColor = "#DDD5C5"}
            >
              <option value="All Types">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Webinar">Webinar</option>
              <option value="Competition">Competition</option>
            </select>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5" }}>
            {isLoading ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#6B7280" }}>Loading opportunities...</div>
            ) : filteredOpps.length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#6B7280" }}>No opportunities found.</div>
            ) : (
              filteredOpps.map((item, index) => {
                return (
              <Link
                key={item.id}
                to={`/opportunities/${item.id}`}
                className="flex flex-col md:flex-row md:items-center"
                style={{
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  padding: "1.5rem 2rem",
                  borderBottom: index < filteredOpps.length - 1 ? "1px solid #DDD5C5" : "none",
                  borderLeft: "4px solid transparent",
                  textDecoration: "none",
                  transition: "background-color 0.2s, border-left-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FDFBF7";
                  e.currentTarget.style.borderLeftColor = "#D4A843";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderLeftColor = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flex: 1, minWidth: 0 }}>
                  <span style={badgeStyle}>{item.type}</span>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "#111111", margin: 0, lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280", margin: "4px 0 0" }}>
                      {item.organization}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#111111", margin: "6px 0 0", fontWeight: 500 }}>
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto md:flex-shrink-0 border-t md:border-t-0 border-dashed border-[#DDD5C5] pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B7280", margin: 0 }}>
                      Deadline
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#333333", margin: "4px 0 0" }}>
                      {new Date(item.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ color: "#D4A843", fontSize: "1.25rem" }}>
                    →
                  </div>
                </div>
              </Link>
            )}))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default OpportunityHub;