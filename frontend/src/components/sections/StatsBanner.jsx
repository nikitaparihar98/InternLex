import { motion } from "framer-motion";

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/>
    <path d="M12 3v18"/>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
);

const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

function StatsBanner() {
  return (
    <section style={{ backgroundColor: "#FDFBF7", padding: "0 1.5rem 4rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ 
            scale: 1.015, 
            y: -5,
            boxShadow: "0 25px 50px rgba(184, 135, 27, 0.08)",
            borderColor: "#D4A843" 
          }}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E0D8",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "3rem",
            gap: "3rem",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
        >
          {/* Left Side: Stats */}
          <div style={{ 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2.5rem",
            paddingRight: "3rem",
            borderRight: "1px solid #E5E0D8",
            minWidth: "max-content"
          }}>
            {/* Stat 1 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: "#B8871B", marginBottom: "0.5rem" }}>
                <UsersIcon />
              </div>
              <h2 style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif", 
                fontSize: "3rem", 
                fontWeight: 700, 
                color: "#111111", 
                margin: "0 0 0.25rem",
                lineHeight: 1
              }}>
                2000+
              </h2>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: "11px", 
                fontWeight: 600, 
                letterSpacing: "0.15em", 
                textTransform: "uppercase", 
                color: "#6B7280", 
                margin: 0 
              }}>
                Interns Trained
              </p>
            </div>

            {/* Stat 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: "#B8871B", marginBottom: "0.5rem" }}>
                <GlobeIcon />
              </div>
              <h2 style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif", 
                fontSize: "3rem", 
                fontWeight: 700, 
                color: "#111111", 
                margin: "0 0 0.25rem",
                lineHeight: 1
              }}>
                150+
              </h2>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: "11px", 
                fontWeight: 600, 
                letterSpacing: "0.15em", 
                textTransform: "uppercase", 
                color: "#6B7280", 
                margin: 0 
              }}>
                Intl. Interns
              </p>
            </div>

            {/* Stat 3 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: "#B8871B", marginBottom: "0.5rem" }}>
                <ScaleIcon />
              </div>
              <h2 style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif", 
                fontSize: "3rem", 
                fontWeight: 700, 
                color: "#111111", 
                margin: "0 0 0.25rem",
                lineHeight: 1
              }}>
                200+
              </h2>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: "11px", 
                fontWeight: 600, 
                letterSpacing: "0.15em", 
                textTransform: "uppercase", 
                color: "#6B7280", 
                margin: 0 
              }}>
                Legal Interns
              </p>
            </div>
          </div>

          {/* Right Side: Features */}
          <div style={{ 
            display: "flex", 
            flex: 1,
            justifyContent: "space-between",
            gap: "2rem"
          }}>
            {[
              "Practical Drafting Assignments",
              "Performance-Based LOR",
              "Published Legal Articles"
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "1rem",
                  flex: 1
                }}
              >
                <div style={{ color: "#B8871B", flexShrink: 0 }}>
                  <CheckCircle />
                </div>
                <p style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: "16px", 
                  color: "#111111", 
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsBanner;
