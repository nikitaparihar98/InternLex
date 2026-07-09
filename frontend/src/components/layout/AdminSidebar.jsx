import { NavLink } from "react-router-dom";

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
      { title: "Case Commentaries", icon: "⚖️", path: "/admin/cases" },
    ],
  },
  {
    title: "Management",
    links: [
      { title: "Opportunities", path: "/admin/opportunities" },
    ],
  },
];

function AdminSidebar() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", width: "280px", minHeight: "100vh", backgroundColor: "#FFFFFF", borderRight: "1px solid #DDD5C5", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#111111", marginBottom: "2.5rem" }}>
        InternLex
      </h1>

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
  );
}

export default AdminSidebar;