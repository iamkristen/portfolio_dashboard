import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const AboutMeForm = () => {
  const [formData, setFormData] = useState({
    avatar: '',
    name: '',
    profession: '',
    description: '',
    age: '',
    residence: '',
    freelance: '',
    address: '',
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
    console.log('Form submitted:', formData);
    // Add logic to submit the form data (e.g., send it to a server)
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">Avatar:</label>
          <input type="text" className="form-control" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="profession" className="form-label">Profession:</label>
          <input type="text" className="form-control" id="profession" name="profession" value={formData.profession} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="residence" className="form-label">Residence:</label>
          <input type="text" className="form-control" id="residence" name="residence" value={formData.residence} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="freelance" className="form-label">Freelance:</label>
          <input type="text" className="form-control" id="freelance" name="freelance" value={formData.freelance} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AboutMeForm;
