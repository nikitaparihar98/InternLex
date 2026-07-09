const STATS = [
  { number: "500",  suffix: "+", label: "Active Internships" },
  { number: "200",  suffix: "+", label: "Scholarly Articles" },
  { number: "50",   suffix: "+", label: "Partner Law Colleges" },
  { number: "1,000",suffix: "+", label: "Law Students" },
];

function Stats() {
  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #DDD5C5",
        borderBottom: "1px solid #DDD5C5",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map((item, index) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "2.5rem 2rem",
              borderRight: index < STATS.length - 1 ? "1px solid #DDD5C5" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "2.75rem",
                fontWeight: 600,
                lineHeight: 1,
                color: "#111111",
              }}
            >
              {item.number}
              <span style={{ color: "#B8871B" }}>{item.suffix}</span>
            </span>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6B7280",
                marginTop: "0.6rem",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;