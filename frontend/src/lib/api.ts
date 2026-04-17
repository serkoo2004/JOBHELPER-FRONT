import axios, { AxiosInstance } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" }
});

if (typeof window !== "undefined") {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("cc_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const adminKey = localStorage.getItem("cc_admin_key");
    if (adminKey && config.url?.includes("/admin")) {
      config.headers["x-admin-key"] = adminKey;
    }
    return config;
  });

  api.interceptors.response.use(
    (r) => r,
    (error) => {
      if (error?.response?.status === 401 && typeof window !== "undefined") {
        // optional: redirect to sign-in
      }
      return Promise.reject(error);
    }
  );
}

// ──────────────────────────────────────────────
// Backend endpoint wrappers (matches eksikler.txt spec)
// ──────────────────────────────────────────────
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/api/v1/auth/login", data).then((r) => r.data)
};

export const profileApi = {
  create: (payload: any) => api.post("/api/v1/profiles", payload).then((r) => r.data),
  get: (id: string) => api.get(`/api/v1/profiles/${id}`).then((r) => r.data),
  update: (id: string, payload: any) =>
    api.put(`/api/v1/profiles/${id}`, payload).then((r) => r.data)
};

export const resumeApi = {
  analyze: (text: string) =>
    api.post("/api/v1/resume-tools/analyze", { content: text }).then((r) => r.data),
  analyzeUpload: (form: FormData) =>
    api
      .post("/api/v1/resume-tools/analyze-upload", form, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((r) => r.data),
  generate: (payload: any) =>
    api.post("/api/v1/resume-tools/generate", payload).then((r) => r.data),
  generateFile: (payload: any) =>
    api.post("/api/v1/resume-tools/generate-file", payload).then((r) => r.data),
  templates: () => api.get("/api/v1/resume-tools/templates").then((r) => r.data),
  createDraft: (payload: any) =>
    api.post("/api/v1/resume-drafts", payload).then((r) => r.data),
  autoDraft: (payload: any) =>
    api.post("/api/v1/resumes/auto-draft", payload).then((r) => r.data),
  autoGenerateFile: (payload: any) =>
    api.post("/api/v1/resumes/auto-generate-file", payload).then((r) => r.data),
  finalize: (draftId: string) =>
    api.post(`/api/v1/resume-drafts/${draftId}/finalize`).then((r) => r.data),
  export: (draftId: string, fmt = "pdf") =>
    api.post(`/api/v1/resume-drafts/${draftId}/export`, { format: fmt }).then((r) => r.data),
  listSaved: () => api.get("/api/v1/resumes").then((r) => r.data),
  versions: (resumeId: string) =>
    api.get(`/api/v1/resumes/${resumeId}/versions`).then((r) => r.data),
  restoreVersion: (resumeId: string, versionId: string) =>
    api.post(`/api/v1/resumes/${resumeId}/versions/${versionId}/restore`).then((r) => r.data)
};

export const coverLetterApi = {
  generate: (payload: any) =>
    api.post("/api/v1/cover-letters/generate", payload).then((r) => r.data)
};

export const careerApi = {
  jobMatch: (p: any) => api.post("/api/v1/career-tools/job-match", p).then((r) => r.data),
  linkedinOptimize: (p: any) =>
    api.post("/api/v1/career-tools/linkedin-optimize", p).then((r) => r.data),
  portfolioSummary: (p: any) =>
    api.post("/api/v1/career-tools/portfolio-summary", p).then((r) => r.data),
  interviewPrep: (p: any) =>
    api.post("/api/v1/career-tools/interview-prep", p).then((r) => r.data),
  roadmap: (p: any) => api.post("/api/v1/career-tools/roadmap", p).then((r) => r.data),
  photoAssistant: (p: any) =>
    api.post("/api/v1/career-tools/photo-assistant", p).then((r) => r.data),
  coach: (p: any) => api.post("/api/v1/career-tools/coach", p).then((r) => r.data)
};

export const applicationsApi = {
  list: () => api.get("/api/v1/applications").then((r) => r.data),
  create: (p: any) => api.post("/api/v1/applications", p).then((r) => r.data),
  get: (id: string) => api.get(`/api/v1/applications/${id}`).then((r) => r.data),
  update: (id: string, p: any) =>
    api.put(`/api/v1/applications/${id}`, p).then((r) => r.data)
};

export const flowApi = {
  start: (p: any) => api.post("/api/v1/flows/document", p).then((r) => r.data),
  get: (id: string) => api.get(`/api/v1/flows/${id}`).then((r) => r.data),
  answer: (id: string, p: any) =>
    api.post(`/api/v1/flows/${id}/answer`, p).then((r) => r.data),
  generateDraft: (id: string) =>
    api.post(`/api/v1/flows/${id}/generate-resume-draft`).then((r) => r.data)
};

export const aiSessionApi = {
  create: (p: any) => api.post("/api/v1/ai-sessions", p).then((r) => r.data),
  list: () => api.get("/api/v1/ai-sessions").then((r) => r.data),
  get: (id: string) => api.get(`/api/v1/ai-sessions/${id}`).then((r) => r.data),
  message: (id: string, p: any) =>
    api.post(`/api/v1/ai-sessions/${id}/message`, p).then((r) => r.data)
};

export const assetsApi = {
  uploadPhoto: (form: FormData) =>
    api
      .post("/api/v1/assets/photo", form, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((r) => r.data),
  professionalizePhoto: (p: any) =>
    api.post("/api/v1/assets/photo/professionalize", p).then((r) => r.data),
  listPhotos: () => api.get("/api/v1/assets/photos").then((r) => r.data),
  listTemplates: () => api.get("/api/v1/assets/templates").then((r) => r.data)
};

export const adminApi = {
  overview: () => api.get("/api/v1/admin/overview").then((r) => r.data),
  dashboard: () => api.get("/api/v1/admin/dashboard").then((r) => r.data),
  auditLogs: () => api.get("/api/v1/system/audit-logs").then((r) => r.data)
};

export const systemApi = {
  health: () => api.get("/api/v1/health").then((r) => r.data)
};
