import { Menu } from "lucide-react";
 
function AdminTopbar({ onMenuClick }) {
  return (
    <header style={{ height: "80px", backgroundColor: "#FFFFFF", borderBottom: "1px solid #DDD5C5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Hamburger Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111111",
            padding: "8px",
            marginLeft: "-8px",
          }}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
 
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#111111", margin: 0, lineHeight: 1.1 }}>
            Admin Portal
          </h2>
          <p className="hidden sm:block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B7280", margin: "2px 0 0" }}>
            Manage InternLex content and opportunities
          </p>
        </div>
      </div>
 
      <div style={{ width: "40px", height: "40px", backgroundColor: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, borderRadius: "50%", flexShrink: 0 }}>
        A
      </div>
    </header>
  );
}
 
export default AdminTopbar;