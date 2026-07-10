import { useRef } from "react";
import { motion } from "framer-motion";
import Footer from "../../../components/layout/Footer";

function About() {
  const sliderRef = useRef(null);
  const scrollLeft = () => sliderRef.current?.scrollBy({ left: -350, behavior: 'smooth' });
  const scrollRight = () => sliderRef.current?.scrollBy({ left: 350, behavior: 'smooth' });

  const testSliderRef = useRef(null);
  const scrollTestLeft = () => testSliderRef.current?.scrollBy({ left: -350, behavior: 'smooth' });
  const scrollTestRight = () => testSliderRef.current?.scrollBy({ left: 350, behavior: 'smooth' });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const boxStyle = {
    backgroundColor: "#FFFFFF", 
    border: "1px solid #E5E0D8", 
    borderRadius: "16px", 
    padding: "2.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
  };

  const headingStyle = {
    fontFamily: "'Cormorant Garamond', Georgia, serif", 
    fontSize: "2rem", 
    fontWeight: 600, 
    color: "#111111", 
    marginBottom: "1.25rem"
  };

  const textStyle = {
    fontFamily: "'Inter', sans-serif", 
    fontSize: "15px", 
    color: "#6B7280", 
    lineHeight: 1.7,
    fontStyle: "italic"
  };

  return (
    <>
      <main style={{ backgroundColor: "#FDFBF7", color: "#111111", minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 2.5rem)", overflow: "hidden" }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "4rem", marginBottom: "4rem", alignItems: "start" }}>
            {/* Top Left: Title */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1 variants={itemVariants} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 600, lineHeight: 1.1, color: "#111111", margin: "0 0 2rem" }}>
                Meet the Minds<br/>Behind <span style={{ color: "#B8871B", textShadow: "0 0 25px rgba(217, 119, 6, 0.8), 0 0 10px rgba(217, 119, 6, 0.5)" }}>InternLex</span>
              </motion.h1>
              <motion.p variants={itemVariants} style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "#4B5563", lineHeight: 1.6, maxWidth: "500px" }}>
                We believe strong legal professionals are built through consistency, clarity in drafting, and depth in research. Practical exposure and accountability are essential for long-term growth.
              </motion.p>
            </motion.div>

            {/* Top Right: Who We Are */}
            <motion.div 
              initial={{ opacity: 0, x: 20, boxShadow: "0 0 0px rgba(217, 119, 6, 0)" }} 
              animate={{ opacity: 1, x: 0, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" }} 
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(217, 119, 6, 0.25), 0 0 25px rgba(217, 119, 6, 0.4)", borderColor: "#D97706" }}
              transition={{ duration: 0.4, ease: "easeOut" }} 
              style={{ ...boxStyle, transition: "border-color 0.2s ease" }}
            >
              <h2 style={headingStyle}>Who we are ?</h2>
              <p style={textStyle}>
                "InternLex is a skill-focused legal initiative created to help law students move beyond classroom learning. We focus on developing practical ability, professional discipline, and structured legal thinking. Our aim is to shape students into confident and capable future professionals."
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "4rem", marginBottom: "4rem" }}>
            {/* Bottom Left: Why InternLex */}
            <motion.div 
              initial={{ opacity: 0, y: 30, boxShadow: "0 0 0px rgba(217, 119, 6, 0)" }} 
              animate={{ opacity: 1, y: 0, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" }} 
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(217, 119, 6, 0.25), 0 0 25px rgba(217, 119, 6, 0.4)", borderColor: "#D97706" }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }} 
              style={{ ...boxStyle, transition: "border-color 0.2s ease" }}
            >
              <h2 style={headingStyle}>Why InternLex Was Created?</h2>
              <p style={textStyle}>
                "Many law students complete internships but do not get meaningful drafting work or detailed feedback. InternLex was established to bridge that gap. Here, students actively work on real legal tasks instead of only observing."
              </p>
            </motion.div>

            {/* Bottom Right: Our Approach */}
            <motion.div 
              initial={{ opacity: 0, y: 30, boxShadow: "0 0 0px rgba(217, 119, 6, 0)" }} 
              animate={{ opacity: 1, y: 0, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" }} 
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(217, 119, 6, 0.25), 0 0 25px rgba(217, 119, 6, 0.4)", borderColor: "#D97706" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }} 
              style={{ ...boxStyle, transition: "border-color 0.2s ease" }}
            >
              <h2 style={headingStyle}>Our Approach</h2>
              <ul style={{ ...textStyle, listStyle: "none", padding: 0, margin: 0, fontStyle: "normal", display: "flex", flexDirection: "column", gap: "12px", color: "#4B5563" }}>
                <li>Learning by Doing</li>
                <li>Real Legal Assignments</li>
                <li>Critical and Analytical Thinking</li>
                <li>Structured Deadlines and Discipline</li>
                <li>Merit-Based Recognition</li>
              </ul>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ marginBottom: "8rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", minWidth: 0, width: "100%" }}>
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(217, 119, 6, 0.2), 0 0 25px rgba(217, 119, 6, 0.3)", borderColor: "#D97706" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderLeft: "6px solid #B8871B", borderRadius: "16px", padding: "clamp(1.5rem, 5vw, 3rem)", width: "100%", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)", transition: "border-color 0.2s ease", boxSizing: "border-box" }}
              >
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 6vw, 2.8rem)", fontWeight: 700, color: "#111111", margin: "0 0 1.5rem", lineHeight: 1.2 }}>
                  The Team Behind InternLex
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7 }}>
                  InternLex is led by a dedicated team committed to improving the quality of legal training. Each member focuses on maintaining professional standards, structured evaluation, and meaningful student development.
                </p>
              </motion.div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem", position: "relative", minWidth: 0, width: "100%" }}>
                
                {/* Left Navigation Arrow */}
                <button className="hidden md:flex" onClick={scrollLeft} style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B8871B"; e.currentTarget.style.color = "#B8871B"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E0D8"; e.currentTarget.style.color = "#111111"; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
 
                <div 
                  ref={sliderRef}
                  style={{ display: "flex", flex: 1, overflowX: "auto", scrollSnapType: "x mandatory", gap: "1.5rem", paddingBottom: "1rem", scrollbarWidth: "none", msOverflowStyle: "none", minWidth: 0 }}
                  className="hide-scrollbar"
                >
                  <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                  {[
                    { name: "Ritik Raghav", title: "FOUNDER", imgPlaceholder: "/team-ritik.jpg", zoom: 1 },
                    { name: "Dev Pawar", title: "DIRECTOR", imgPlaceholder: "/team-dev-pawar.png", zoom: 1 },
                    { name: "Jyotsna", title: "ACADEMIC EXECUTIVE", imgPlaceholder: "/team-jyotsna.jpg", zoom: 1 },
                    { name: "Ananya Aggarwal", title: "OPERATIONS MANAGER", imgPlaceholder: "/team-ananya.jpg", zoom: 1.25 },
                    { name: "Garv Yadav", title: "PARTNERSHIPS & PROGRAM EXEC", imgPlaceholder: "/team-garv.jpg", zoom: 1 }
                  ].map((member, index) => (
                    <motion.div
                      key={index}
                      whileHover="hover"
                      initial="initial"
                      animate="initial"
                      variants={{
                        initial: { y: 0, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.03)", borderColor: "#E5E0D8" },
                        hover: { y: -8, boxShadow: "0 15px 35px rgba(217, 119, 6, 0.25), 0 0 20px rgba(217, 119, 6, 0.4)", borderColor: "#D97706" }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      style={{ flex: "0 0 calc(33.333% - 1rem)", minWidth: "180px", scrollSnapAlign: "start", backgroundColor: "#FFFFFF", borderRadius: "12px", overflow: "hidden", padding: "1rem", border: "1px solid #E5E0D8", cursor: "pointer", transition: "border-color 0.2s ease" }}
                    >
                      <div style={{ width: "100%", aspectRatio: "1/1", backgroundColor: "#FDFBF7", borderRadius: "8px", overflow: "hidden", marginBottom: "1rem", position: "relative" }}>
                        <motion.div
                          variants={{
                            initial: { opacity: 0 },
                            hover: { opacity: 1 }
                          }}
                          style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(217, 119, 6, 0.4) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }}
                        />
                        <motion.img 
                          variants={{
                            initial: { scale: member.zoom, filter: "grayscale(100%)", WebkitFilter: "grayscale(100%)" },
                            hover: { scale: member.zoom + 0.15, filter: "grayscale(0%) saturate(120%)", WebkitFilter: "grayscale(0%) saturate(120%)" }
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          src={member.imgPlaceholder} 
                          alt={member.name} 
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", position: "relative", zIndex: 2 }} 
                        />
                      </div>
                      <div style={{ position: "relative", zIndex: 2 }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: "#111111", margin: "0 0 0.2rem", lineHeight: 1.1 }}>{member.name}</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#B8871B", margin: 0, lineHeight: 1.4 }}>{member.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Right Navigation Arrow */}
                <button className="hidden md:flex" onClick={scrollRight} style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B8871B"; e.currentTarget.style.color = "#B8871B"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E0D8"; e.currentTarget.style.color = "#111111"; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>

              </div>
            </div>
          </motion.div>

          {/* Testimonials Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, color: "#111111", margin: 0 }}>
                What Our Interns Say
              </h2>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative", minWidth: 0, width: "100%" }}>
              {/* Left Navigation Arrow */}
              <button className="hidden md:flex" onClick={scrollTestLeft} style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B8871B"; e.currentTarget.style.color = "#B8871B"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E0D8"; e.currentTarget.style.color = "#111111"; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
 
              <div 
                ref={testSliderRef}
                style={{ display: "flex", flex: 1, overflowX: "auto", scrollSnapType: "x mandatory", gap: "2rem", paddingBottom: "1rem", paddingTop: "1rem", scrollbarWidth: "none", msOverflowStyle: "none", minWidth: 0 }}
                className="hide-scrollbar"
              >
              {[
                { 
                  name: "Bhumika Chaudhary", 
                  course: "BBA LLB, SPPU", 
                  image: "/testimonial-bhumika.jpg", 
                  testimony: "One of the most impressive aspects of my internship with InternLex was the genuine effort and research reflected in every session and assignment. It was evident that each activity was thoughtfully designed to provide practical learning and real value. What truly set this internship apart was the personal attention and continuous support offered to every intern. The combination of structured learning, practical exposure, and dedicated mentorship made this one of the most valuable online learning experiences for me. I sincerely thank the entire InternLex team for their guidance, support, and commitment to helping aspiring law students grow."
                },
                {
                  name: "Akanksha Mani",
                  course: "LL.B, INTEGRATED SCHOOL OF LAW",
                  image: "/testimonial-akanksha.jpg",
                  testimony: "Completing my first internship in Intellectual Property Rights (IPR) with InternLex was a truly enriching experience. The practical assignments in trademark research, legal drafting, and case analysis helped me strengthen my research, analytical, and legal writing skills while gaining valuable practical exposure. I sincerely appreciate the guidance and support of the InternLex team and would highly recommend this internship to anyone interested in building a strong foundation in IPR."
                },
                {
                  name: "Sandal Khan",
                  course: "BA LL.B (Hons.), GIBS (GGSIPU)",
                  image: "/testimonial-sandal.jpg",
                  testimony: "My journey with InternLex was truly rewarding and exceeded my expectations. The internship provided meaningful exposure to legal drafting and research through practical, well-designed assignments that strengthened my analytical and drafting skills. Every task had a clear learning objective, making the experience engaging and helping me understand the practical side of law beyond academics. I sincerely appreciate the dedication of the InternLex team in creating such a supportive and learning-focused platform, and I would highly recommend it to every law student seeking practical legal exposure."
                },
                {
                  name: "Kalpit Garg",
                  course: "B.A.LL.B, MAIMS",
                  image: "/testimonial-kalpit.jpg",
                  testimony: "InternLex provided me with an excellent opportunity to bridge the gap between classroom learning and practical application. The internship challenged me to think critically, work independently, and approach legal tasks with greater confidence. I am grateful to the InternLex team for their constant support and for creating a platform that genuinely contributes to the professional growth of law students."
                },
                {
                  name: "Pooja Kumari",
                  course: "B.A.LL.B, Modern Law College, Pune",
                  image: "/testimonial-pooja.jpg",
                  testimony: "My first internship with InternLex was a truly enriching and confidence-building experience. It helped me transform my theoretical knowledge into practical skills through meaningful tasks that strengthened my legal research, drafting, and analytical abilities. I especially appreciated InternLex's emphasis on originality and independent thinking, which made the learning process genuinely rewarding. I am sincerely grateful to the InternLex team for making my first internship such a valuable and memorable experience."
                },
                {
                  name: "Shravani Kulkarni",
                  course: "BBA LL.B, PES Modern Law College",
                  image: "/testimonial-shravani.jpg",
                  testimony: "My Corporate Drafting Internship with InternLex was a truly enriching learning experience. The practical tasks and insightful sessions helped me understand not only the drafting process but also the reasoning behind every clause. The constructive feedback on my work helped me recognize and improve my mistakes, making the learning process even more valuable. I sincerely thank the InternLex team for their guidance and support throughout the internship."
                },
                {
                  name: "Shashi Singh",
                  course: "B.A.LL.B, KES JP Law College",
                  image: "/testimonial-shashi.jpg",
                  testimony: "My internship with InternLex was a truly enriching experience that enhanced my legal drafting and research skills through practical assignments. The hands-on learning approach made it easier to understand the practical application of legal concepts and contributed significantly to my growth as a law student. I sincerely thank the InternLex team for this valuable opportunity and appreciate their continuous support throughout the internship."
                },
                {
                  name: "Soniya Thakur",
                  course: "LL.B, Shahaji Law College, Kolhapur",
                  image: "/testimonial-soniya.jpg",
                  testimony: "My Corporate Drafting Internship with InternLex was an insightful and rewarding experience. The practical assignments helped me develop a better understanding of corporate drafting while improving my drafting and documentation skills. I also enjoyed the competitions and learning activities, which provided valuable exposure beyond the internship. I sincerely thank the InternLex team for this wonderful opportunity and wish them continued success in the future."
                },
                {
                  name: "Manjari Bhiwapurkar",
                  course: "BA.LL.B, Dr Babasaheb Ambedkar School of Law, Nagpur",
                  image: "/testimonial-manjari.jpg",
                  testimony: "The Legal Drafting Program was a highly valuable learning experience that strengthened my understanding of legal drafting through practical and well-structured sessions. The bilingual approach (Hindi and English) made complex concepts easy to understand, while the drafting exercises helped build my confidence and practical skills. I sincerely thank Ma'am, Sir, and the InternLex team for their guidance and support throughout this enriching program."
                },
                {
                  name: "Devanshe Nigam",
                  course: "B.A.LL.B, Dr.K.N.K. Law College",
                  image: "/testimonial-devanshe.jpg",
                  objectPosition: "center 15%",
                  testimony: "My internship with InternLex was a rewarding learning experience that enhanced my legal research and analytical skills through practical assignments. The guidance from the mentors and the supportive learning environment made the experience both engaging and valuable. I sincerely thank the InternLex team for this opportunity and highly recommend it to law students seeking practical legal exposure."
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6, boxShadow: "0 25px 50px rgba(217, 119, 6, 0.2), 0 0 20px rgba(217, 119, 6, 0.1)", borderColor: "#D97706" }}
                  style={{ 
                    flex: "0 0 calc(33.333% - 1.33rem)",
                    minWidth: "clamp(280px, 85vw, 420px)",
                    scrollSnapAlign: "start",
                    backgroundColor: "#FFFFFF", 
                    border: "3px solid #B8871B", 
                    borderTop: "8px solid #B8871B", 
                    borderRadius: "12px", 
                    padding: "1.8rem clamp(1rem, 5vw, 2.5rem)", 
                    position: "relative", 
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                  }}
                >
                  {/* Subtle quote watermark in background */}
                  <div style={{ position: "absolute", top: "3rem", right: "2.5rem", color: "#F3F4F6", fontSize: "8rem", fontFamily: "Georgia, serif", lineHeight: 0.5, zIndex: 0, pointerEvents: "none" }}>"</div>
                  
                  <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{ padding: "4px", border: "1px solid #E5E0D8", borderRadius: "50%", display: "flex", flexShrink: 0 }}>
                      <img src={testimonial.image} alt={testimonial.name} style={{ width: "65px", height: "65px", borderRadius: "50%", objectFit: "cover", objectPosition: testimonial.objectPosition || "center" }} />
                    </div>
                    <div style={{ marginLeft: "1.25rem" }}>
                      <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#111111", margin: "0 0 0.2rem" }}>{testimonial.name}</h4>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#B8871B", margin: 0 }}>{testimonial.course}</p>
                    </div>
                  </div>
                  
                  <p style={{ position: "relative", zIndex: 1, fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#1F2937", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                    "{testimonial.testimony}"
                  </p>
                </motion.div>
              ))}
              </div>

              {/* Right Navigation Arrow */}
              <button className="hidden md:flex" onClick={scrollTestRight} style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B8871B"; e.currentTarget.style.color = "#B8871B"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E0D8"; e.currentTarget.style.color = "#111111"; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </motion.div>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;