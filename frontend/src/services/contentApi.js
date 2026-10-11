import api from "./api";

// ---------------------------------------------------------------------------
// IN-MEMORY CLIENT CACHE (Fast navigation, avoids redundant network transfers)
// ---------------------------------------------------------------------------
const cache = new Map();
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes cache TTL

export const getCached = async (key, fetcher, force = false) => {
  const cached = cache.get(key);
  const now = Date.now();
  if (!force && cached && (now - cached.time < CACHE_TTL_MS)) {
    return cached.data;
  }
  const data = await fetcher();
  cache.set(key, { data, time: now });
  return data;
};

export const clearCache = (prefix = "") => {
  if (!prefix) {
    cache.clear();
  } else {
    for (const key of Array.from(cache.keys())) {
      if (key.startsWith(prefix)) cache.delete(key);
    }
  }
};

// ---------------------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------------------
export const getArticles = async (force = false) => {
  return getCached("articles", async () => {
    const response = await api.get("/articles");
    return response.data;
  }, force);
};

export const getArticle = async (id, force = false) => {
  return getCached(`article_${id}`, async () => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  }, force);
};

export const createArticle = async (data) => {
  clearCache("article");
  const response = await api.post("/articles", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateArticle = async (id, data) => {
  clearCache("article");
  const response = await api.put(`/articles/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteArticle = async (id) => {
  clearCache("article");
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// BLOGS
// ---------------------------------------------------------------------------
export const getBlogs = async (force = false) => {
  return getCached("blogs", async () => {
    const response = await api.get("/blogs");
    return response.data;
  }, force);
};

export const getBlog = async (id, force = false) => {
  return getCached(`blog_${id}`, async () => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  }, force);
};

export const createBlog = async (data) => {
  clearCache("blog");
  const response = await api.post("/blogs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlog = async (id, data) => {
  clearCache("blog");
  const response = await api.put(`/blogs/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  clearCache("blog");
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// CASE SUMMARIES
// ---------------------------------------------------------------------------
export const getCaseCommentaries = async (force = false) => {
  return getCached("cases", async () => {
    const response = await api.get("/case-commentaries");
    return response.data;
  }, force);
};

export const getCaseCommentary = async (id, force = false) => {
  return getCached(`case_${id}`, async () => {
    const response = await api.get(`/case-commentaries/${id}`);
    return response.data;
  }, force);
};

export const createCaseCommentary = async (data) => {
  clearCache("case");
  const response = await api.post("/case-commentaries", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCaseCommentary = async (id, data) => {
  clearCache("case");
  const response = await api.put(`/case-commentaries/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCaseCommentary = async (id) => {
  clearCache("case");
  const response = await api.delete(`/case-commentaries/${id}`);
  return response.data;
};

// ---------------------------------------------------------------------------
// OPPORTUNITIES
// ---------------------------------------------------------------------------
export const getOpportunities = async (force = false) => {
  return getCached("opportunities", async () => {
    const response = await api.get("/opportunities");
    return response.data;
  }, force);
};

export const getOpportunity = async (id, force = false) => {
  return getCached(`opportunity_${id}`, async () => {
    const response = await api.get(`/opportunities/${id}`);
    return response.data;
  }, force);
};

export const createOpportunity = async (data) => {
  clearCache("opportunit");
  const response = await api.post("/opportunities", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateOpportunity = async (id, data) => {
  clearCache("opportunit");
  const response = await api.put(`/opportunities/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteOpportunity = async (id) => {
  clearCache("opportunit");
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
