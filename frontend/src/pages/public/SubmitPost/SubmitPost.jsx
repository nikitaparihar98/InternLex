import { motion } from "framer-motion";
import Footer from "../../../components/layout/Footer";

const SectionHeading = ({ children }) => (
  <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#111111", margin: "4rem 0 2rem", letterSpacing: "-0.02em", borderBottom: "2px solid #E5E0D8", paddingBottom: "0.75rem" }}>
    {children}
  </h2>
);

const NumberedItem = ({ number, title, points }) => (
  <div style={{ marginBottom: "2rem" }}>
    <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#111111", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ backgroundColor: "#F3E7C8", color: "#8A650F", width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: "15px" }}>{number}</span>
      {title}
    </h4>
    <ul style={{ paddingLeft: "3.2rem", margin: 0, listStyleType: "disc", color: "#4B5563", fontSize: "1.05rem", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
      {points.map((pt, idx) => (
        <li key={idx} style={{ marginBottom: "0.6rem" }}>{pt}</li>
      ))}
    </ul>
  </div>
);

const RequirementCard = ({ title, items }) => (
  <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: "12px", padding: "1.75rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
    <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#111111", marginBottom: "1.2rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>{title}</h4>
    <ul style={{ paddingLeft: "1.25rem", margin: 0, listStyleType: "circle", color: "#6B7280", fontSize: "0.95rem", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
      {items.map((item, idx) => (
        <li key={idx} style={{ marginBottom: "0.5rem" }}>{item}</li>
      ))}
    </ul>
  </div>
);

function SubmitPost() {
  return (
    <>
      <main style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", paddingTop: "120px", paddingBottom: "80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 3rem)", color: "#111111" }}
        >

          <div style={{ marginBottom: "3rem", borderBottom: "2px solid #E5E0D8", paddingBottom: "2rem" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 700, margin: "0 0 1rem", lineHeight: 1.1 }}>
              Publish with Intern<span style={{ color: "#B8871B" }}>Lex</span>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>
              Share Your Content & Opportunities
            </p>
          </div>

          <article style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", lineHeight: 1.8, color: "#2A2A2A" }}>

            <div style={{ fontSize: "1.4rem", fontStyle: "italic", marginBottom: "3rem", color: "#374151" }}>
              <p style={{ marginBottom: "1.5rem" }}>
                Thank you for choosing <strong style={{ color: "#B8871B", fontWeight: 700 }}>InternLex</strong> to share your legal content and opportunities. We are dedicated to connecting law students, legal professionals, organizations, and educators through a trusted platform for learning and professional growth.
              </p>
              <p style={{ marginBottom: "0" }}>
                Whether you're submitting an internship, event, webinar, competition, or article, our aim is to help your content reach the right legal audience. Please review the guidelines below before submitting to ensure a smooth and timely publication process.
              </p>
            </div>

            <SectionHeading>Submitting a post on InternLex: Guidelines</SectionHeading>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "#6B7280", marginBottom: "2.5rem" }}>
              To ensure a smooth review and publication process, please follow these guidelines before submitting your content to InternLex:
            </p>

            <NumberedItem 
              number="1" 
              title="Submission Process" 
              points={[
                "Submit your content through the designated submission form or official email.",
                "Use a clear and relevant subject line for your submission.",
                "Ensure all information provided is accurate and up to date."
              ]} 
            />

            <NumberedItem 
              number="2" 
              title="Review Timeline" 
              points={[
                "Our editorial team carefully reviews every submission.",
                "The review and publication process may take 2–5 working days.",
                "Additional time may be required if revisions or clarifications are needed."
              ]} 
            />

            <NumberedItem 
              number="3" 
              title="Content Requirements" 
              points={[
                "Articles, blogs, and legal analyses should generally be between 500–1500 words.",
                "Content must be original, well-structured, and free from plagiarism.",
                "Proper citations and references should be included wherever necessary."
              ]} 
            />

            <NumberedItem 
              number="4" 
              title="Supporting Documents" 
              points={[
                "Brochures, posters, registration links, and other relevant materials may be attached separately.",
                "If submitting an opportunity, internship, webinar, or event, provide the official source link."
              ]} 
            />

            <NumberedItem 
              number="5" 
              title="Accuracy of Information" 
              points={[
                "Authors are responsible for the accuracy and authenticity of the information submitted.",
                "InternLex reserves the right to edit, reject, or request modifications to any submission."
              ]} 
            />

            <NumberedItem 
              number="6" 
              title="Updates & Corrections" 
              points={[
                "If you wish to update an already published post, kindly submit the request using the same communication channel used for the original submission.",
                "Significant changes may require a fresh review."
              ]} 
            />

            <NumberedItem 
              number="7" 
              title="Editorial Rights" 
              points={[
                "InternLex reserves the right to make minor grammatical, formatting, and editorial changes to improve readability and consistency.",
                "Such edits will not alter the core meaning of the content."
              ]} 
            />


            <SectionHeading>Information Required for Opportunity Posts</SectionHeading>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              <RequirementCard 
                title="Events, Webinars & Competitions"
                items={[
                  "Organizer details",
                  "About the event/opportunity",
                  "Eligibility criteria",
                  "Venue or mode (Online/Offline)",
                  "Registration procedure",
                  "Registration fee (if applicable)",
                  "Important dates and deadlines",
                  "Awards, certificates, or benefits",
                  "Contact details",
                  "Official brochure or registration link"
                ]}
              />

              <RequirementCard 
                title="Internship Opportunities"
                items={[
                  "About the organization",
                  "Internship title/position",
                  "Eligibility criteria",
                  "Key responsibilities",
                  "Mode (Online/Offline/Hybrid)",
                  "Duration of internship",
                  "Stipend (if any)",
                  "Number of openings (if applicable)",
                  "Application process & deadline",
                  "Contact information",
                  "Official website or social media links"
                ]}
              />

              <RequirementCard 
                title="Call for Papers / Article Competitions"
                items={[
                  "Theme or topic",
                  "Organizer details",
                  "Submission guidelines & word limit",
                  "Important dates",
                  "Registration/publication fee (if any)",
                  "Awards and benefits",
                  "Submission link & contact details"
                ]}
              />

              <RequirementCard 
                title="Publication Opportunities"
                items={[
                  "About the journal/platform",
                  "Accepted categories of submissions",
                  "Citation format & word limit",
                  "Publication charges (if any)",
                  "Certificate availability",
                  "Submission process & deadlines",
                  "Contact details"
                ]}
              />
            </div>

            <div style={{ backgroundColor: "#F3F0E6", padding: "1.5rem 2rem", borderRadius: "12px", borderLeft: "4px solid #D4A843", marginTop: "4rem", marginBottom: "3rem" }}>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", fontWeight: 800, color: "#111111", margin: "0 0 0.75rem" }}>Disclaimer</h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#4B5563", margin: 0, lineHeight: 1.6 }}>
                Publication on InternLex does not imply endorsement of any organization, event, opportunity, or opinion. Authors and organizers are solely responsible for the accuracy of the information provided. <strong style={{ color: "#111111" }}>InternLex reserves the right to decline or remove content that does not align with its editorial standards.</strong>
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <a
                href="mailto:team.internlex@gmail.com"
                style={{
                  display: "inline-block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  backgroundColor: "#111111",
                  textDecoration: "none",
                  padding: "1rem 2.5rem",
                  borderRadius: "50px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                  e.currentTarget.style.backgroundColor = "#2A2A2A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
                  e.currentTarget.style.backgroundColor = "#111111";
                }}
              >
                Submit Your Post
              </a>
            </div>

          </article>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

export default SubmitPost;
