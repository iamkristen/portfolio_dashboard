import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const ExperienceForm = () => {
  const [formData, setFormData] = useState({
    timePeriod: '',
    title: '',
    company: '',
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
          <label htmlFor="timePeriod" className="form-label">Time Period:</label>
          <input type="text" className="form-control" id="timePeriod" name="timePeriod" value={formData.timePeriod} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company:</label>
          <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleChange} required />
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

export default ExperienceForm;
