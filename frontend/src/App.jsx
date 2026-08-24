import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Public Pages
import Home from "./pages/public/Home/Home";
import OpportunityHub from "./pages/public/OpportunityHub/OpportunityHub";
import OpportunityDetail from "./pages/public/OpportunityHub/OpportunityDetail";
import Articles from "./pages/public/Articles/Articles";
import ArticleDetail from "./pages/public/Articles/ArticleDetail";
import BlogDetail from "./pages/public/Blogs/BlogDetail";
import CaseCommentaries from "./pages/public/CaseCommentaries/CaseCommentaries";
import CaseCommentaryDetail from "./pages/public/CaseCommentaries/CaseCommentaryDetail";
import About from "./pages/public/About/About";
import PrivacyPolicy from "./pages/public/About/PrivacyPolicy";
import SubmitPost from "./pages/public/SubmitPost/SubmitPost";

// Auth Pages
import Login from "./pages/public/Auth/Login";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Opportunities from "./pages/admin/Opportunities/Opportunities";
import AdminArticles from "./pages/admin/Articles/Articles";
import Blogs from "./pages/admin/Blogs/Blogs";
import AdminCaseCommentaries from "./pages/admin/CaseCommentaries/CaseCommentaries";

// Student Pages removed

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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

        {/* Student Routes - Protected */}
        {/* Removed */}
      </Routes>
    </>
  );
}

export default App;