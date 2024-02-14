import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom_css/custom_navbar.css'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Link,useLocation} from "react-router-dom"
import logo from '../assets/logo.png'

const MyNavbar = () => {

  const location = useLocation();

  const routesWithoutNavbar = ['/login'];

  const shouldHideNavbar = routesWithoutNavbar.includes(location.pathname);

  if (shouldHideNavbar) {
    return null; 
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed='top' >
      <Navbar.Brand as={Link} to="/" className='mx-3'><img
          src={logo}
          alt="Logo"
          height="30"
          className="d-inline-block align-top"
        /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/about-me">About Me</Nav.Link>
          <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
          <NavDropdown title="Resume" className="bg-dark text-white" id="resume-dropdown">
            <NavDropdown.Item as={Link} to="experience">Experience</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="education">Education</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="skills">Skills</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="knowledge">Knowledge</NavDropdown.Item>
            </NavDropdown>
          <Nav.Link as={Link} to="contact-me">Contact Me</Nav.Link>
          <Nav.Link as={Link} to="social-link">Social Links</Nav.Link>
          <Nav.Link as={Link} to="mail">Mail</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
