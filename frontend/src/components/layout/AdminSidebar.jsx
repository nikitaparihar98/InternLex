import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const groups = [
  {
    title: "Main",
    links: [{ title: "Dashboard", path: "/admin/dashboard" }],
  },
  {
    title: "Content",
    links: [
      { title: "Articles", path: "/admin/articles" },
      { title: "Blogs", path: "/admin/blogs" },
      { title: "Case Commentaries", path: "/admin/cases" },
    ],
  },
  {
    title: "Management",
    links: [
      { title: "Opportunities", path: "/admin/opportunities" },
    ],
  },
];

function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="lg:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            zIndex: 998,
          }}
        />
      )}

      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-[999] lg:z-auto transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          width: "280px", 
          minHeight: "100vh", 
          backgroundColor: "#FFFFFF", 
          borderRight: "1px solid #DDD5C5", 
          padding: "2rem 1.5rem" 
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#111111", margin: 0 }}>
            InternLex
          </h1>
          {/* Close button for mobile drawer */}
          <button 
            onClick={onClose}
            className="lg:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex", padding: "4px" }}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {groups.map((group) => (
            <div key={group.title}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "1rem" }}>
                {group.title}
              </p>

              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {group.links.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    end={item.path === '/admin/dashboard'}
                    onClick={onClose}
                    style={({ isActive }) => ({
                      display: "block",
                      padding: "0.75rem 1rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: isActive ? "#111111" : "#4B5563",
                      backgroundColor: isActive ? "#F3E7C8" : "transparent",
                      textDecoration: "none",
                      borderRadius: "4px",
                      transition: "all 0.2s ease"
                    })}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <NavLink
            to="/"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#B8871B",
              backgroundColor: "transparent",
              textDecoration: "none",
              borderRadius: "4px",
              border: "1px solid #DDD5C5",
              transition: "all 0.2s ease",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F5F1EA";
              e.currentTarget.style.borderColor = "#B8871B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#DDD5C5";
            }}
          >
            ← Back to Site
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;