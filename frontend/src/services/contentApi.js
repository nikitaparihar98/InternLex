import api from "./api";

// ---------------------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------------------
export const getArticles = async () => {
  const response = await api.get("/articles");
  return response.data;
};

export const createArticle = async (data) => {
  const response = await api.post("/articles", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateArticle = async (id, data) => {
  const response = await api.put(`/articles/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// BLOGS
// ---------------------------------------------------------------------------
export const getBlogs = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

export const createBlog = async (data) => {
  const response = await api.post("/blogs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlog = async (id, data) => {
  const response = await api.put(`/blogs/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// CASE SUMMARIES
// ---------------------------------------------------------------------------
export const getCaseCommentaries = async () => {
  const response = await api.get("/case-commentaries");
  return response.data;
};

export const createCaseCommentary = async (data) => {
  const response = await api.post("/case-commentaries", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCaseCommentary = async (id, data) => {
  const response = await api.put(`/case-commentaries/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCaseCommentary = async (id) => {
  const response = await api.delete(`/case-commentaries/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// OPPORTUNITIES
// ---------------------------------------------------------------------------
export const getOpportunities = async () => {
  const response = await api.get("/opportunities");
  return response.data;
};

export const getOpportunity = async (id) => {
  const response = await api.get(`/opportunities/${id}`);
  return response.data;
};

export const createOpportunity = async (data) => {
  const response = await api.post("/opportunities", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateOpportunity = async (id, data) => {
  const response = await api.put(`/opportunities/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteOpportunity = async (id) => {
  const response = await api.delete(`/opportunities/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// USERS
// ---------------------------------------------------------------------------
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// APPLICATIONS
// ---------------------------------------------------------------------------
export const listApplications = async () => {
  const response = await api.get("/applications");
  return response.data;
};

export const applyToOpportunity = async (opportunityId, formData) => {
  const response = await api.post(`/applications/${opportunityId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/applications/${id}/status`, { status });
  return response.data;
};

// ---------------------------------------------------------------------------
// ASSIGNMENTS & SUBMISSIONS
// ---------------------------------------------------------------------------
export const sendAssignment = async (applicationId, data) => {
  const response = await api.post(`/assignments/${applicationId}`, data);
  return response.data;
};

export const getMyAssignments = async () => {
  const response = await api.get("/assignments/my");
  return response.data;
};

export const submitAssignment = async (assignmentId, formData) => {
  // formData should be a FormData instance containing 'answer_file'
  const response = await api.post(`/assignments/${assignmentId}/submit`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const listSubmissions = async () => {
  const response = await api.get("/submissions");
  return response.data;
};



// ---------------------------------------------------------------------------
// PROFILE
// ---------------------------------------------------------------------------
export const updateProfile = async (data) => {
  const response = await api.put("/auth/me", data);
  return response.data;
};
