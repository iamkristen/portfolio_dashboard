import './App.css';
import MyNavbar from './components/navbar';
import AboutMe from './pages/about_me_form';
import BlogForm from './pages/blog_form';
import ExperienceForm from './pages/experience_from';
import MailboxList from './pages/mailbox_list';
import ProjectForm from './pages/projects_form';
import SocialLinksForm from './pages/social_links_form';
import EducationForm from './pages/education_form';
import SkillsForm from './pages/skills_form';
import KnowledgeForm from './pages/knowledge_from';
import ContactMeForm from './pages/contact_me_form';
import LoginPage from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Dashboard() {
  return (
    <Router>
      <div>
        <MyNavbar />
        {/* <AboutMe/> */}
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/about-me" element={<AboutMe/>} />
          <Route path="/blogs" element={<BlogForm/>} />
          <Route path="/projects" element={<ProjectForm/>} />
          <Route path="/experience" element={<ExperienceForm/>} />
          <Route path="/education" element={<EducationForm/>}/>
          <Route path="/knowledge" element={<KnowledgeForm/>} />
          <Route path="/contact-me" element={<ContactMeForm/>} />
          <Route path="/social-link" element={<SocialLinksForm/>} />
          <Route path="/skills" element={<SkillsForm/>} />
          <Route path="/mail" element={<MailboxList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default Dashboard;
