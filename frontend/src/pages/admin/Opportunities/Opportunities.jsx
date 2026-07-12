/* eslint-disable react-hooks/set-state-in-effect, no-unused-vars */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../../layouts/AdminLayout";
import { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } from "../../../services/contentApi";
import RichTextEditor from "../../../components/ui/RichTextEditor";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const initialForm = {
    title: "",
    organization: "",
    type: "Internship",
    mode: "Online",
    description: "",
    deadline: "",
    location: "",
    apply_link: "",
    status: "Published",
    image_type: "landscape"
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchOpportunities = async () => {
    try {
      const data = await getOpportunities();
      const sorted = data.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
      setOpportunities(sorted);
      setFilteredOpportunities(sorted);
    } catch (error) {
      toast.error("Failed to fetch opportunities.");
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    let result = opportunities;
    if (filterType !== "All") {
      result = result.filter(o => o.type === filterType);
    }
    if (filterStatus !== "All") {
      result = result.filter(o => o.status === filterStatus);
    }
    if (search.trim()) {
      result = result.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || o.organization.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredOpportunities(result);
  }, [search, filterType, filterStatus, opportunities]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData(initialForm);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditId(item.id);
    setFormData({
      title: item.title,
      organization: item.organization,
      type: item.type,
      mode: item.mode || "Online",
      description: item.description,
      deadline: item.deadline.split("T")[0],
      location: item.location || "",
      apply_link: item.apply_link || "",
      status: item.status,
      image_type: item.image_type || "landscape"
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(editId ? "Updating opportunity..." : "Publishing opportunity...");
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    if (imageFile) {
      submitData.append("banner_image", imageFile);
    }

    try {
      if (editId) {
        await updateOpportunity(editId, submitData);
        toast.success("Opportunity updated successfully!", { id: loadingToast });
      } else {
        await createOpportunity(submitData);
        toast.success("Opportunity published successfully!", { id: loadingToast });
      }
      setIsModalOpen(false);
      setFormData(initialForm);
      setEditId(null);
      setImageFile(null);
      fetchOpportunities();
    } catch (error) {
      toast.error(editId ? "Failed to update opportunity." : "Failed to publish opportunity.", { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      const loadingToast = toast.loading("Deleting...");
      try {
        await deleteOpportunity(id);
        toast.success("Deleted successfully!", { id: loadingToast });
        fetchOpportunities();
      } catch (error) {
        toast.error("Failed to delete.", { id: loadingToast });
      }
    }
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === "Published" ? "Closed" : "Published";
    const loadingToast = toast.loading(`Changing status to ${newStatus}...`);
    try {
      await updateOpportunity(item.id, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`, { id: loadingToast });
      fetchOpportunities();
    } catch (error) {
      toast.error("Failed to update status", { id: loadingToast });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4" style={{ marginBottom: "2.5rem" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4A843", marginBottom: "0.5rem" }}>
            Opportunity Management
          </p>

          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 7vw, 3rem)", fontWeight: 600, color: "#111111", margin: 0 }}>
            Opportunities
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", marginTop: "0.5rem" }}>
            Manage internships, webinars and competitions.
          </p>
        </div>

        <button 
          onClick={openAddModal}
          style={{ backgroundColor: "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.85rem 1.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#B8871B"} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#111111"}
        >
          + New Opportunity
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
        <input 
          type="text" 
          placeholder="Search by title or organization..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px]"
          style={{ padding: "0.75rem", border: "1px solid #DDD5C5", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }}
        />
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full sm:w-auto"
          style={{ padding: "0.75rem", border: "1px solid #DDD5C5", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "#fff" }}
        >
          <option value="All">All Types</option>
          <option value="Internship">Internship</option>
          <option value="Job">Job</option>
          <option value="Webinar">Webinar</option>
          <option value="Competition">Competition</option>
        </select>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto"
          style={{ padding: "0.75rem", border: "1px solid #DDD5C5", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "#fff" }}
        >
          <option value="All">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(17, 17, 17, 0.4)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="w-full max-w-[600px] p-4 sm:p-10" style={{ backgroundColor: "#FFFFFF", maxHeight: "90vh", overflowY: "auto", border: "1px solid #DDD5C5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#111111", margin: 0 }}>
                {editId ? "Edit Opportunity" : "Publish Opportunity"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", color: "#6B7280", cursor: "pointer" }}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>TITLE</label>
                <input required name="title" value={formData.title} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} placeholder="e.g. Legal Research Intern" />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>ORGANIZATION</label>
                <input required name="organization" value={formData.organization} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} placeholder="e.g. Sharma & Associates" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>TYPE</label>
                  <select required name="type" value={formData.type} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}>
                    <option value="Internship">Internship</option>
                    <option value="Job">Job</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>MODE</label>
                  <select required name="mode" value={formData.mode} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>DEADLINE</label>
                  <input required name="deadline" type="date" value={formData.deadline} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>STATUS</label>
                  <select required name="status" value={formData.status} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}>
                    <option value="Published">Published</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>LOCATION (Optional)</label>
                <input name="location" value={formData.location} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} placeholder="e.g. New Delhi, India" />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>DESCRIPTION</label>
                <RichTextEditor value={formData.description} onChange={(val) => setFormData({ ...formData, description: val })} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>EXTERNAL LINK (Optional)</label>
                <input name="apply_link" type="url" value={formData.apply_link} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>BANNER IMAGE (Optional)</label>
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#111111", marginBottom: "0.5rem" }}>IMAGE ASPECT RATIO</label>
                  <select name="image_type" value={formData.image_type} onChange={handleChange} style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}>
                    <option value="landscape">Landscape (16:9)</option>
                    <option value="portrait">Portrait (3:4)</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" style={{ width: "100%", backgroundColor: "#B8871B", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "1rem", border: "none", cursor: "pointer", transition: "background-color 0.2s", marginTop: "1rem" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#9e7417"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#B8871B"}>
                {editId ? "Save Changes" : "Publish"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#F8F6F1", borderBottom: "1px solid #DDD5C5" }}>
            <tr>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Title</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Organization</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Type</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Status</th>
              <th style={{ textAlign: "left", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Deadline</th>
              <th style={{ textAlign: "right", padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "3rem", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>
                  No opportunities found.
                </td>
              </tr>
            ) : (
              filteredOpportunities.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #DDD5C5" }}>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#111111" }}>{item.title}</td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>{item.organization}</td>
                  <td style={{ padding: "1.25rem" }}>
                    <span style={{ backgroundColor: "#F8F6F1", color: "#B8871B", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: "1.25rem" }}>
                    <button 
                      onClick={() => toggleStatus(item)} 
                      style={{ border: "none", background: "none", cursor: "pointer", backgroundColor: item.status === "Published" ? "#D1FAE5" : "#F3F4F6", color: item.status === "Published" ? "#065F46" : "#374151", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td style={{ padding: "1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>
                    {new Date(item.deadline).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "1.25rem", textAlign: "right" }}>
                    <button onClick={() => openEditModal(item)} style={{ background: "none", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#111111", cursor: "pointer", marginRight: "1rem" }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#EF4444", cursor: "pointer" }}>Delete</button>
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

export default Opportunities;