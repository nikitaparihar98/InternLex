import Footer from "../../../components/layout/Footer";
import { motion } from "framer-motion";

function TermsOfService() {
  return (
    <>
      <main style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", paddingTop: "140px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2.5rem" }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "4rem", textAlign: "center" }}
          >
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 600, color: "#111111", margin: 0 }}>
              Terms of Service
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", marginTop: "1rem" }}>
              Last Updated: February 27, 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E0D8",
              borderRadius: "12px",
              padding: "3rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#4B5563", lineHeight: 1.8 }}>
              
              <p style={{ marginBottom: "2rem" }}>
                Welcome to InternLex. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read these Terms of Service carefully before using our site.
              </p>

              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", color: "#111111", marginTop: "2.5rem", marginBottom: "1rem" }}>
                1. Content Usage Terms
              </h4>
              <ul style={{ paddingLeft: "1.25rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><strong style={{ color: "#111111" }}>a. Ownership and Intellectual Property:</strong> All articles, case commentaries, and legal materials available on this website are the intellectual property of InternLex or their respective authors, protected under copyright laws.</li>
                <li><strong style={{ color: "#111111" }}>b. Restrictions on Use:</strong> You may not copy, distribute, modify, or republish any content from this website without obtaining explicit written consent from InternLex.</li>
                <li><strong style={{ color: "#111111" }}>c. Permissible Sharing:</strong> You are allowed to share links to our content on social media or other platforms, provided it is for non-commercial purposes and does not infringe on any third-party rights.</li>
                <li><strong style={{ color: "#111111" }}>d. User Contributions:</strong> Any content submitted by users, such as comments or articles, must comply with our community standards and may be reviewed for appropriateness and compliance.</li>
              </ul>

              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", color: "#111111", marginTop: "2.5rem", marginBottom: "1rem" }}>
                2. Internship Application Terms
              </h4>
              <ul style={{ paddingLeft: "1.25rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><strong style={{ color: "#111111" }}>a. Truthfulness:</strong> All details provided in the internship application must be accurate and truthful.</li>
                <li><strong style={{ color: "#111111" }}>b. Selection:</strong> Submitting an application does not guarantee selection or employment with InternLex.</li>
                <li><strong style={{ color: "#111111" }}>c. Ownership:</strong> Any materials submitted during the application process, including writing samples or resumes, become the property of InternLex and will be used solely for assessment purposes.</li>
                <li><strong style={{ color: "#111111" }}>d. Termination:</strong> InternLex reserves the right to terminate an internship at any time for reasons including misconduct or failure to meet performance expectations.</li>
              </ul>

              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", color: "#111111", marginTop: "2.5rem", marginBottom: "1rem" }}>
                3. Website Usage and Conduct
              </h4>
              <ul style={{ paddingLeft: "1.25rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><strong style={{ color: "#111111" }}>Content Responsibility:</strong> You are responsible for any information or content you post, ensuring it does not violate laws or infringe on others' rights.</li>
                <li><strong style={{ color: "#111111" }}>Appropriate Use:</strong> You must not engage in activities that disrupt or interfere with the proper functioning of the website.</li>
                <li><strong style={{ color: "#111111" }}>Security:</strong> Do not attempt to gain unauthorized access to any part of the website, its servers, or associated systems.</li>
                <li><strong style={{ color: "#111111" }}>Suspension:</strong> InternLex reserves the right to suspend or terminate access for violations or abusive behavior.</li>
              </ul>

              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", color: "#111111", marginTop: "2.5rem", marginBottom: "1rem" }}>
                4. Acceptance and Modifications
              </h4>
              <p style={{ marginBottom: "2rem" }}>
                By using the InternLex website, you acknowledge and agree to these Terms of Service. If you do not agree with any part of these terms, please refrain from using this website.
              </p>

            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfService;
