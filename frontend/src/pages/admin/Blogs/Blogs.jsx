/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../../../services/contentApi";
import toast from "react-hot-toast";
import RichTextEditor from "../../../components/ui/RichTextEditor";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publication_date: "",
    image: null,
    description: "",
    content: "",
    status: "Published"
  });

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
      publication_date: item.publication_date ? new Date(item.publication_date).toISOString().split('T')[0] : "",
      image: null,
      description: item.description,
      content: item.content,
      status: item.status || "Published"
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ title: "", author: "", publication_date: "", image: null, description: "", content: "", status: "Published" });
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
        await updateBlog(editId, data);
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(data);
        toast.success("Blog created successfully!");
      }
      setIsModalOpen(false);
      setFormData({ title: "", author: "", publication_date: "", image: null, description: "", content: "", status: "Published" });
      setEditId(null);
      fetchBlogs(); // Refresh list
    } catch (error) {
      console.error("Blog submit error:", error.response?.data || error);
      toast.error(error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || "Failed to save blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog deleted.");
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4" style={{ marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#B8871B", marginBottom: "0.5rem" }}>
            Content Management
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 7vw, 3rem)", fontWeight: 600, color: "#111111", margin: 0 }}>
            Blogs
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", marginTop: "0.5rem" }}>
            Upload and manage legal blogs and opinions.
          </p>
        </div>

        <button 
          onClick={openAddModal}
          style={{ backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.85rem 1.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B8871B"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#111111"}
        >
          + New Blog
        </button>
      </div>

      {isModalOpen && (
        <div className="p-4 sm:p-8" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#111111", margin: 0 }}>
              {editId ? "Edit Blog" : "Create New Blog"}
            </h2>
            <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#6B7280" }}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Title *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Author *</label>
                <input required type="text" name="author" value={formData.author} onChange={handleInputChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.25rem" }}>
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

            <div>
              <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>Full Content *</label>
              <RichTextEditor 
                value={formData.content} 
                onChange={(val) => setFormData({ ...formData, content: val })} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: "transparent", color: "#111111", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.75rem 1.5rem", border: "1px solid #DDD5C5", cursor: "pointer" }}>Cancel</button>
              <button type="submit" disabled={isSubmitting} style={{ backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.75rem 1.5rem", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                {isSubmitting ? "Saving..." : editId ? "Save Changes" : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#F8F6F1", borderBottom: "1px solid #DDD5C5" }}>
            <tr>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Title</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Author</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pub Date</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Created</th>
              <th style={{ textAlign: "right", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>No blogs found.</td></tr>
            ) : (
              blogs.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #DDD5C5", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FDFCFB"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#111111" }}>{item.title}</td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>{item.author || "Unknown"}</td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>
                    <span style={{ backgroundColor: "#F5F1EA", color: "#B8871B", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "12px", fontWeight: 500 }}>
                      {item.publication_date ? new Date(item.publication_date).toLocaleDateString() : "N/A"}
                    </span>
                  </td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>{new Date(item.created_at).toLocaleDateString()}</td>
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

export default Blogs;