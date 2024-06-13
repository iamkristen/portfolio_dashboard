import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";

const EducationForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    timePeriod: "",
    title: "",
    location: "",
    description: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.education) {
      // If location state has education data, it means we're in update mode
      const educationData = location.state.education;
      setFormData({
        id: educationData._id,
        timePeriod: educationData.timePeriod,
        title: educationData.title,
        location: educationData.location,
        description: educationData.description,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = formData.id
        ? `/api/education/update/${formData.id}`
        : "/api/education/add";

      const response = await AxiosInstance.post(url, {
        timePeriod: formData.timePeriod,
        title: formData.title,
        location: formData.location,
        description: formData.description,
      });

      if (response.data.success) {
        alert(
          formData.id
            ? "Education entry updated successfully"
            : "Education entry added successfully"
        );
        navigate("/education");
      } else {
        alert(
          `Education entry ${formData.id ? "update" : "add"} failed: ${
            response.data.error
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="timePeriod" className="form-label">
            Time Period:
          </label>
          <input
            type="text"
            className="form-control"
            id="timePeriod"
            name="timePeriod"
            value={formData.timePeriod}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EducationForm;
