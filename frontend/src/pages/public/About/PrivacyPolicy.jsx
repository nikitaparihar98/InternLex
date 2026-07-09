import Footer from "../../../components/layout/Footer";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Section = ({ title, children, num }) => (
  <motion.div 
    variants={fadeIn}
    style={{ marginBottom: "3.5rem" }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
      {num && (
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "rgba(212, 168, 67, 0.2)",
          lineHeight: 1,
          marginTop: "-0.2rem"
        }}>
          {num}
        </span>
      )}
      <div>
        <h2 style={{ 
          fontFamily: "'Cormorant Garamond', Georgia, serif", 
          fontSize: "1.85rem", 
          fontWeight: 600, 
          color: "#111111", 
          margin: "0 0 1.25rem",
          lineHeight: 1.2
        }}>
          {title}
        </h2>
        <div style={{ 
          fontFamily: "'Inter', sans-serif", 
          fontSize: "15px", 
          color: "#4B5563", 
          lineHeight: 1.8 
        }}>
          {children}
        </div>
      </div>
    </div>
  </motion.div>
);

const SubHeading = ({ children }) => (
  <h3 style={{ 
    fontFamily: "'Inter', sans-serif", 
    fontSize: "14px", 
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase", 
    color: "#D4A843", 
    margin: "1.5rem 0 1rem" 
  }}>
    {children}
  </h3>
);

const BulletList = ({ items }) => (
  <ul style={{ 
    listStyle: "none", 
    padding: 0, 
    margin: "0 0 1.5rem", 
    display: "flex", 
    flexDirection: "column", 
    gap: "0.75rem" 
  }}>
    {items.map((item, index) => (
      <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <span style={{ color: "#D4A843", marginTop: "2px" }}>•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

function PrivacyPolicy() {
  return (
    <>
      <main style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", paddingTop: "140px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2.5rem" }}>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            style={{ marginBottom: "5rem", textAlign: "center" }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4A843",
              marginBottom: "1.5rem",
            }}>
              Legal & Compliance
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#111111", margin: "0 0 1.5rem" }}>
              Privacy Policy
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", margin: "0 auto", maxWidth: "650px", lineHeight: 1.7 }}>
              Welcome to InternLex. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly, securely, and in accordance with applicable laws.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E0D8",
              borderRadius: "16px",
              padding: "4rem clamp(2rem, 5vw, 4rem)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
            }}
          >
            <motion.p variants={fadeIn} style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#4B5563", lineHeight: 1.8, marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid #E5E0D8" }}>
              This Privacy Policy explains how InternLex collects, uses, stores, and protects your personal information when you access our website, participate in our programs, or use any of our services. By accessing or using InternLex's website, applications, internship programs, webinars, competitions, publications, or any other services offered by us, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </motion.p>

            <Section title="Information We Collect" num="1">
              <p style={{ marginBottom: "1rem" }}>We may collect the following categories of information:</p>
              
              <SubHeading>A. Personal Information</SubHeading>
              <BulletList items={[
                "Full Name",
                "Email Address",
                "Mobile Number",
                "Date of Birth (where required)",
                "College/University Name",
                "Course and Academic Year",
                "City, State, and Country",
              ]} />

              <SubHeading>B. Academic and Professional Information</SubHeading>
              <BulletList items={[
                "Resume/CV",
                "Cover Letter",
                "LinkedIn Profile",
                "Academic Qualifications",
                "Skills and Certifications",
                "Internship Preferences",
              ]} />

              <SubHeading>C. Payment Information</SubHeading>
              <p>Where any paid services are offered, payment transactions are processed through secure third-party payment gateways. InternLex <strong style={{ color: "#111111" }}>does not store</strong> your complete debit card, credit card, UPI PIN, or banking credentials.</p>

              <SubHeading>D. Technical Information</SubHeading>
              <p style={{ marginBottom: "1rem" }}>When you visit our website, we may automatically collect:</p>
              <BulletList items={[
                "IP Address",
                "Browser Type",
                "Device Information",
                "Operating System",
                "Pages Visited",
                "Date and Time of Access",
                "Cookies and Similar Technologies",
              ]} />
            </Section>

            <Section title="How We Use Your Information" num="2">
              <p style={{ marginBottom: "1rem" }}>Your information may be used to:</p>
              <BulletList items={[
                "Register you for internships, events, competitions, and webinars.",
                "Process applications and issue certificates.",
                "Communicate important updates regarding our services.",
                "Respond to your queries and provide customer support.",
                "Improve our website, services, and user experience.",
                "Maintain records for administrative purposes.",
                "Verify participant identity where necessary.",
                "Comply with legal and regulatory obligations.",
                "Prevent fraud, abuse, and unauthorized access.",
              ]} />
            </Section>

            <Section title="Cookies" num="3">
              <p style={{ marginBottom: "1rem" }}>InternLex may use cookies and similar technologies to improve website functionality, analyze traffic, remember user preferences, and enhance the browsing experience.</p>
              <p>Users may disable cookies through their browser settings. However, some features of the website may not function properly if cookies are disabled.</p>
            </Section>

            <Section title="Sharing of Information" num="4">
              <p style={{ marginBottom: "1rem" }}>InternLex respects your privacy and <strong style={{ color: "#111111" }}>does not sell, rent, or trade</strong> your personal information. Your information may only be shared:</p>
              <BulletList items={[
                "With internship partners where necessary for placement or selection.",
                "With payment service providers for transaction processing.",
                "With technology and hosting service providers who assist in operating our platform.",
                "When required by law, court order, or any competent governmental authority.",
                "To protect the legal rights, safety, and security of InternLex or its users.",
              ]} />
            </Section>

            <Section title="Data Security" num="5">
              <p style={{ marginBottom: "1rem" }}>InternLex implements reasonable administrative, technical, and organizational measures to safeguard personal information against unauthorized access, misuse, disclosure, alteration, or destruction.</p>
              <p>While we strive to protect your information, no method of internet transmission or electronic storage is completely secure. Therefore, absolute security cannot be guaranteed.</p>
            </Section>

            <Section title="Data Retention" num="6">
              <p style={{ marginBottom: "1rem" }}>We retain personal information only for as long as necessary to:</p>
              <BulletList items={[
                "Provide our services.",
                "Maintain internship and certification records.",
                "Comply with applicable legal obligations.",
                "Resolve disputes and enforce our policies.",
              ]} />
              <p>After the applicable retention period, information may be securely deleted or anonymized.</p>
            </Section>

            <Section title="Your Rights" num="7">
              <p style={{ marginBottom: "1rem" }}>Subject to applicable law, users may have the right to:</p>
              <BulletList items={[
                "Access their personal information.",
                "Request correction of inaccurate information.",
                "Request deletion of personal data.",
                "Withdraw consent where processing is based on consent.",
                "Opt out of promotional communications at any time.",
              ]} />
              <p>Requests may be submitted through our official contact email.</p>
            </Section>

            <Section title="Research Papers, Articles, and Publications" num="8">
              <p style={{ marginBottom: "1rem" }}>Any manuscript, article, case commentary, blog, or research paper submitted to InternLex will be used solely for editorial, publication, review, and academic purposes.</p>
              <p>Unless otherwise agreed in writing, authors retain ownership of their original work, subject to any publication or licensing terms applicable to the specific submission.</p>
            </Section>

            <Section title="Internship Applications" num="9">
              <p style={{ marginBottom: "1rem" }}>Information submitted for internship applications may be shared with collaborating organizations solely for recruitment, selection, evaluation, or internship administration.</p>
              <p>InternLex does not disclose applicant information for unrelated commercial purposes.</p>
            </Section>

            <Section title="Webinar and Event Recordings" num="10">
              <p style={{ marginBottom: "1rem" }}>Online events, webinars, workshops, and training sessions may be recorded for educational, archival, promotional, or quality assurance purposes.</p>
              <p>By participating in such events, users acknowledge and consent to such recordings unless otherwise notified.</p>
            </Section>

            <Section title="Third-Party Websites" num="11">
              <p style={{ marginBottom: "1rem" }}>Our website may contain links to external websites operated by third parties.</p>
              <p>InternLex is not responsible for the privacy practices, content, or policies of such third-party websites. Users are encouraged to review the privacy policies of those websites separately.</p>
            </Section>

            <Section title="Children's Privacy" num="12">
              <p>InternLex's services are not intended for children who are not legally capable of providing valid consent under applicable law. If we become aware that personal information has been collected without appropriate authorization where required, we will take reasonable steps to delete such information.</p>
            </Section>

            <Section title="Changes to this Privacy Policy" num="13">
              <p style={{ marginBottom: "1rem" }}>InternLex reserves the right to modify or update this Privacy Policy at any time.</p>
              <p>Any changes will become effective immediately upon publication on our website. Users are encouraged to review this Privacy Policy periodically.</p>
            </Section>

            <Section title="Disclaimer" num="14">
              <p style={{ marginBottom: "1rem" }}>Any statements regarding career growth or professional success are aspirational and illustrative only. InternLex does not guarantee internships, employment, publications, admissions, or the establishment of a legal practice, as individual outcomes depend on each participant’s efforts, qualifications, and external factors.</p>
              <p style={{ marginBottom: "1rem" }}>The information and educational materials provided are for general informational purposes only and do not constitute legal advice.</p>
              <p style={{ marginBottom: "1rem" }}>Users remain responsible for independently verifying information and for decisions made on the basis of the platform’s content.</p>
              <p>InternLex is not responsible for the acts, omissions, or policies of third-party organizations offering internships, hosting events, or processing payments.</p>
            </Section>

            <Section title="Governing Law" num="15">
              <p>This Privacy Policy shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts.</p>
            </Section>

            <Section title="Contact Us" num="16">
              <p style={{ marginBottom: "1.5rem" }}>For any questions, concerns, or requests relating to this Privacy Policy or your personal information, please contact us:</p>
              <div style={{ backgroundColor: "#FDFBF7", padding: "2rem", borderRadius: "8px", border: "1px solid #E5E0D8" }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#111111", margin: "0 0 1rem" }}>InternLex</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#4B5563" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <strong style={{ color: "#111111" }}>Email:</strong> 
                    <a href="mailto:team.internlex@gmail.com" style={{ color: "#D4A843", textDecoration: "none", fontWeight: 500 }}>team.internlex@gmail.com</a>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <strong style={{ color: "#111111" }}>Website:</strong> 
                    <a href="https://internlex.in" style={{ color: "#D4A843", textDecoration: "none", fontWeight: 500 }}>internlex.in</a>
                  </div>
                </div>
              </div>
            </Section>
            
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
