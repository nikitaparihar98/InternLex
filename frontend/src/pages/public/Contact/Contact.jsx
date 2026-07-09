import Footer from "../../../components/layout/Footer";

function Contact() {
  return (
    <>
      <section style={{ backgroundColor: "#F5F1EA", minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          
          {/* Left Column - Info */}
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4A843", marginBottom: "1rem" }}>
              Get in Touch
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.5rem", fontWeight: 600, color: "#111111", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
              Contact Our Team
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
              Whether you are a legal professional seeking mentorship or a firm looking to partner with InternLex, we are here to help. Reach out to us using the form or via our global offices.
            </p>

            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#111111", margin: "0 0 0.5rem" }}>London</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
                  12 Legal Court<br/>
                  London, EC4A 2BB<br/>
                  United Kingdom
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#111111", margin: "0 0 0.5rem" }}>Mumbai</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
                  Level 8, BKC<br/>
                  Bandra East, 400051<br/>
                  India
                </p>
              </div>
            </div>
            
            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #DDD5C5" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#111111", fontWeight: 500 }}>Email: <a href="mailto:inquiries@internlex.com" style={{ color: "#B8871B", textDecoration: "none" }}>inquiries@internlex.com</a></p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#111111", fontWeight: 500, marginTop: "0.5rem" }}>Phone: <span style={{ color: "#6B7280" }}>+44 20 7123 4567</span></p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "3rem 2.5rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#111111", margin: "0 0 2rem" }}>
              Send a Message
            </h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>First Name</label>
                  <input type="text" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#B8871B"} onBlur={(e) => e.target.style.borderColor = "#DDD5C5"} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Last Name</label>
                  <input type="text" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#B8871B"} onBlur={(e) => e.target.style.borderColor = "#DDD5C5"} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Email Address</label>
                <input type="email" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#B8871B"} onBlur={(e) => e.target.style.borderColor = "#DDD5C5"} />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Inquiry Type</label>
                <select style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "#FFFFFF", color: "#6B7280" }} onFocus={(e) => e.target.style.borderColor = "#B8871B"} onBlur={(e) => e.target.style.borderColor = "#DDD5C5"}>
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                  <option>Support</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Message</label>
                <textarea rows="5" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", resize: "vertical" }} onFocus={(e) => e.target.style.borderColor = "#B8871B"} onBlur={(e) => e.target.style.borderColor = "#DDD5C5"}></textarea>
              </div>

              <button 
                type="button"
                style={{ width: "100%", backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "1rem", border: "none", cursor: "pointer", marginTop: "1rem", transition: "background-color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B8871B"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#111111"}
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
