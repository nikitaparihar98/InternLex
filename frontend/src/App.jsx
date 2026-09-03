import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Public Pages (Lazy Loaded)
const Home = lazy(() => import("./pages/public/Home/Home"));
const OpportunityHub = lazy(() => import("./pages/public/OpportunityHub/OpportunityHub"));
const OpportunityDetail = lazy(() => import("./pages/public/OpportunityHub/OpportunityDetail"));
const Articles = lazy(() => import("./pages/public/Articles/Articles"));
const ArticleDetail = lazy(() => import("./pages/public/Articles/ArticleDetail"));
const BlogDetail = lazy(() => import("./pages/public/Blogs/BlogDetail"));
const CaseCommentaries = lazy(() => import("./pages/public/CaseCommentaries/CaseCommentaries"));
const CaseCommentaryDetail = lazy(() => import("./pages/public/CaseCommentaries/CaseCommentaryDetail"));
const About = lazy(() => import("./pages/public/About/About"));
const PrivacyPolicy = lazy(() => import("./pages/public/About/PrivacyPolicy"));
const SubmitPost = lazy(() => import("./pages/public/SubmitPost/SubmitPost"));

// Auth Pages (Lazy Loaded)
const Login = lazy(() => import("./pages/public/Auth/Login"));

// Admin Pages (Lazy Loaded)
const Dashboard = lazy(() => import("./pages/admin/Dashboard/Dashboard"));
const Opportunities = lazy(() => import("./pages/admin/Opportunities/Opportunities"));
const AdminArticles = lazy(() => import("./pages/admin/Articles/Articles"));
const Blogs = lazy(() => import("./pages/admin/Blogs/Blogs"));
const AdminCaseCommentaries = lazy(() => import("./pages/admin/CaseCommentaries/CaseCommentaries"));

const PageLoader = () => (
  <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: "32px", height: "32px", border: "3px solid #E5E0D8", borderTopColor: "#B8871B", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/opportunities" element={<><Navbar /><OpportunityHub /></>} />
          <Route path="/opportunities/:id" element={<><Navbar /><OpportunityDetail /></>} />
          <Route path="/articles" element={<><Navbar /><Articles /></>} />
          <Route path="/articles/:id" element={<><Navbar /><ArticleDetail /></>} />
          <Route path="/blogs/:id" element={<><Navbar /><BlogDetail /></>} />
          <Route path="/case-commentaries" element={<><Navbar /><CaseCommentaries /></>} />
          <Route path="/case-commentaries/:id" element={<><Navbar /><CaseCommentaryDetail /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /></>} />
          <Route path="/submit-post" element={<><Navbar /><SubmitPost /></>} />

          {/* Auth Routes */}
          <Route path="/admin" element={<Login />} />

          {/* Admin Routes - Protected */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/opportunities" element={<Opportunities />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/blogs" element={<Blogs />} />
            <Route path="/admin/cases" element={<AdminCaseCommentaries />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;