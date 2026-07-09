function AdminTopbar() {
  return (
    <header style={{ height: "80px", backgroundColor: "#FFFFFF", borderBottom: "1px solid #DDD5C5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem" }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#111111", margin: 0 }}>
          Admin Portal
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280", margin: "2px 0 0" }}>
          Manage InternLex content and opportunities
        </p>
      </div>

      <div style={{ width: "40px", height: "40px", backgroundColor: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, borderRadius: "50%" }}>
        A
      </div>
    </header>
  );
}

export default AdminTopbar;