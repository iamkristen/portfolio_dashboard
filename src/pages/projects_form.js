import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    banner: '',
    projectType: '',
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data (e.g., send it to a server)
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="banner" className="form-label">Banner:</label>
          <input type="text" className="form-control" id="banner" name="banner" value={formData.banner} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="projectType" className="form-label">Project Type:</label>
          <input type="text" className="form-control" id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ProjectForm;
