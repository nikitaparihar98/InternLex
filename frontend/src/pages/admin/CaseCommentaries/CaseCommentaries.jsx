/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { getCaseCommentaries, createCaseCommentary, updateCaseCommentary, deleteCaseCommentary } from "../../../services/contentApi";
import toast from "react-hot-toast";
import RichTextEditor from "../../../components/ui/RichTextEditor";

function CaseCommentaries() {
  const [commentaries, setCommentaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: null,
    court: "",
    description: "",
    facts: "",
    issues: "",
    judgment: "",
    legal_principle: "",
    publication_date: "",
    status: "Published"
  });

  const fetchCommentaries = async () => {
    setIsLoading(true);
    try {
      const data = await getCaseCommentaries();
      setCommentaries(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load commentaries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentaries();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const openEditModal = (item) => {
    setEditId(item.id);
    setFormData({
      title: item.title,
      author: item.author || "",
      category: item.category,
      image: null,
      court: item.court,
      description: item.description,
      facts: item.facts,
      issues: item.issues,
      judgment: item.judgment,
      legal_principle: item.legal_principle,
      publication_date: item.publication_date ? new Date(item.publication_date).toISOString().split('T')[0] : "",
      status: item.status || "Published"
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ title: "", author: "", category: "", image: null, court: "", description: "", facts: "", issues: "", judgment: "", legal_principle: "", publication_date: "", status: "Published" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const val = formData[key];
        if (val !== null && val !== "" && val !== undefined) {
          data.append(key, val);
        }
      });

      if (editId) {
        await updateCaseCommentary(editId, data);
        toast.success("Case commentary updated successfully!");
      } else {
        await createCaseCommentary(data);
        toast.success("Case commentary created successfully!");
      }
      setIsModalOpen(false);
      setFormData({ title: "", author: "", category: "", image: null, court: "", description: "", facts: "", issues: "", judgment: "", legal_principle: "", publication_date: "", status: "Published" });
      setEditId(null);
      fetchCommentaries(); // Refresh list
    } catch (error) {
      console.error("Case commentary submit error:", error.response?.data || error);
      toast.error(error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || "Failed to save case commentary.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case commentary?")) return;
    try {
      await deleteCaseCommentary(id);
      toast.success("Case commentary deleted.");
      fetchCommentaries();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#B8871B", marginBottom: "0.5rem" }}>
            Content Management
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, color: "#111111", margin: 0 }}>
            Case Commentaries
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", marginTop: "0.5rem" }}>
            Manage landmark judgments and legal analysis.
          </p>
        </div>

        <button 
          onClick={openAddModal}
          style={{ backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.85rem 1.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B8871B"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#111111"}
        >
          + New Commentary
        </button>
      </div>

      {isModalOpen && (
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#111111", margin: 0 }}>
              {editId ? "Edit Case Commentary" : "Create Case Commentary"}
            </h2>
            <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#6B7280" }}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Case Title *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Court *</label>
                <input required type="text" name="court" value={formData.court} onChange={handleInputChange} placeholder="e.g., Supreme Court of India" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Author *</label>
                <input required type="text" name="author" value={formData.author} onChange={handleInputChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Category *</label>
                <input required type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="e.g., Constitutional Law" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Publication Date</label>
                <input type="date" name="publication_date" value={formData.publication_date} onChange={handleInputChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Image (Upload)</label>
                <input type="file" accept="image/*" name="image" onChange={handleFileChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.6rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "#FFFFFF" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Short Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="2" style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", resize: "vertical" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Facts *</label>
                <RichTextEditor value={formData.facts} onChange={(val) => setFormData({ ...formData, facts: val })} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Issues *</label>
                <RichTextEditor value={formData.issues} onChange={(val) => setFormData({ ...formData, issues: val })} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Judgment *</label>
                <RichTextEditor value={formData.judgment} onChange={(val) => setFormData({ ...formData, judgment: val })} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Legal Principle *</label>
                <RichTextEditor value={formData.legal_principle} onChange={(val) => setFormData({ ...formData, legal_principle: val })} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: "transparent", color: "#111111", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.75rem 1.5rem", border: "1px solid #DDD5C5", cursor: "pointer" }}>Cancel</button>
              <button type="submit" disabled={isSubmitting} style={{ backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.75rem 1.5rem", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                {isSubmitting ? "Saving..." : editId ? "Save Changes" : "Publish Commentary"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#F8F6F1", borderBottom: "1px solid #DDD5C5" }}>
            <tr>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Case Title</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Court</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Author</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
              <th style={{ textAlign: "right", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>Loading...</td></tr>
            ) : commentaries.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>No case commentaries found.</td></tr>
            ) : (
              commentaries.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #DDD5C5", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FDFCFB"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#111111" }}>{item.title}</td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>{item.court}</td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>{item.author || "Unknown"}</td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>
                    <span style={{ backgroundColor: "#F5F1EA", color: "#B8871B", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "12px", fontWeight: 500 }}>
                      {item.publication_date ? new Date(item.publication_date).toLocaleDateString() : "N/A"}
                    </span>
                  </td>
                  <td style={{ padding: "1.25rem", textAlign: "right" }}>
                    <button onClick={() => openEditModal(item)} style={{ background: "none", border: "none", color: "#111111", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer", marginRight: "1rem" }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", color: "#DC2626", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default CaseCommentaries;