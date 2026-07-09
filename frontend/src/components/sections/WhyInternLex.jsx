import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Practical Legal Internships",
    description: "Gain real-world experience through legal drafting, research, and case-based assignments.",
    footer: "Learn by Doing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="M7 21h10"/>
        <path d="M12 3v18"/>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    )
  },
  {
    title: "Expert Guidance",
    description: "Learn from experienced legal professionals through webinars, mentorship, and personalized feedback.",
    footer: "Learn from Experts",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.3a2 2 0 0 0-1.66 0l-8.57 2.784a2 2 0 0 0-.019 3.838l8.57 2.784a2 2 0 0 0 1.66 0z"/>
        <path d="M22 10v6"/>
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
      </svg>
    )
  },
  {
    title: "Career Growth",
    description: "Earn verified certificates, performance-based LORs, and build a portfolio that gets noticed.",
    footer: "Build Your Profile",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2Z"/>
      </svg>
    )
  },
  {
    title: "Publication Opportunities",
    description: "Publish articles and case commentaries to strengthen your academic and professional profile.",
    footer: "Start Publishing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    )
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function WhyInternLex() {
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "6rem 0" }}>
      <div className="responsive-container" style={{ maxWidth: "1100px" }}>
        
        {/* Header with subtle gold radial gradient behind it */}
        <div style={{ position: "relative", textAlign: "center", marginBottom: "4rem" }}>
          
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(255,255,255,0) 70%)",
            zIndex: 0,
            pointerEvents: "none"
          }}></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#D4A843",
                marginBottom: "1rem",
              }}
            >
              Why InternLex
            </p>
            <h2 style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif", 
              fontSize: "clamp(2rem, 4vw, 2.5rem)", 
              fontWeight: 700, 
              color: "#111111", 
              margin: 0,
              lineHeight: 1.2
            }}>
              Everything You Need to Launch Your Legal Career
            </h2>
            <p style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: "17px", 
              color: "#4B5563", 
              marginTop: "1.25rem",
              maxWidth: "700px",
              margin: "1.25rem auto 0",
              lineHeight: 1.6
            }}>
              From your first internship to building a successful legal practice, InternLex helps law students learn, practice, publish, and grow through one unified platform.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "2rem" 
          }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover="hover"
              initial="initial"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(212, 175, 55, 0.15)",
                borderRadius: "16px",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 14px rgba(0,0,0,0.02)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.02)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.15)";
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                
                <motion.div 
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.08 }
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: "#D4A843",
                    marginBottom: "1.5rem"
                  }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 style={{ 
                  fontFamily: "'Cormorant Garamond', Georgia, serif", 
                  fontSize: "1.75rem", 
                  fontWeight: 700, 
                  color: "#111111", 
                  marginBottom: "1rem",
                  lineHeight: 1.2
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: "15px", 
                  color: "#4B5563", 
                  lineHeight: 1.6,
                  margin: 0,
                  flexGrow: 1
                }}>
                  {feature.description}
                </p>
                
              </div>
            </motion.div>
          ))}
        </motion.div>


        
      </div>
    </section>
  );
}

export default WhyInternLex;
