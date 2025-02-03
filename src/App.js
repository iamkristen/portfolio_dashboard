import React from "react";
import "./App.css";
import MyNavbar from "./components/navbar";
import AboutMe from "./pages/about_me_form";
import Blog from "./pages/blogList";
import BlogForm from "./pages/blog_form";
import ExperienceForm from "./pages/experience_from";
import Experience from "./pages/experinceList";
import MailboxList from "./pages/mailbox_list";
import ProjectForm from "./pages/projects_form";
import Project from "./pages/projectList";
import SocialLinks from "./pages/social_link_list";
import SocialLinksForm from "./pages/social_links_form";
import EducationForm from "./pages/education_form";
import Education from "./pages/educationList";
import Skills from "./pages/skillList";
import SkillsForm from "./pages/skills_form";
import KnowledgeForm from "./pages/knowledge_from";
import Knowledge from "./pages/knowledgeList";
import ContactMeForm from "./pages/contact_me_form";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { isAuthenticated } from "./helper/auth_handler";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Certificate from "./pages/certificateList";
import CertificateForm from "./pages/certificate_form";

function App() {
  return (
    <BrowserRouter>
      <div>
        <MyNavbar />
        <Routes>
          {isAuthenticated() ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs-form" element={<BlogForm />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/projects-form" element={<ProjectForm />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/experience-form" element={<ExperienceForm />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education-form" element={<EducationForm />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/knowledge-form" element={<KnowledgeForm />} />
              <Route path="/contact-me" element={<ContactMeForm />} />
              <Route path="/social-link" element={<SocialLinks />} />
              <Route path="/social-link-form" element={<SocialLinksForm />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/skills-form" element={<SkillsForm />} />
              <Route path="/mail" element={<MailboxList />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/certificates-form" element={<CertificateForm />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <Route path="/login" element={<LoginPage />} />
          )}
          {/* Redirect to login page if not authenticated */}
          {!isAuthenticated() && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
