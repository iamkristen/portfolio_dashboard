import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const SkillsForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    level: '',
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
          <label htmlFor="type" className="form-label">Type:</label>
          <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level:</label>
          <input type="text" className="form-control" id="level" name="level" value={formData.level} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SkillsForm;
