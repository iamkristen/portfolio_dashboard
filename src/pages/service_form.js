import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    icon: '',
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
          <label htmlFor="icon" className="form-label">Icon:</label>
          <input type="text" className="form-control" id="icon" name="icon" value={formData.icon} onChange={handleChange} required />
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

export default ServiceForm;
