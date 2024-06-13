import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";

const ExperienceForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    timePeriod: "",
    title: "",
    company: "",
    description: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.experience) {
      // If location state has experience data, it means we're in update mode
      const experienceData = location.state.experience;
      setFormData({
        id: experienceData._id,
        timePeriod: experienceData.timePeriod,
        title: experienceData.title,
        company: experienceData.company,
        description: experienceData.description,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      if (
        !formData.timePeriod ||
        !formData.title ||
        !formData.company ||
        !formData.description
      ) {
        alert("All fields are required");
        return;
      }
    }

    try {
      const url = formData.id
        ? `/api/experience/update/${formData.id}`
        : "/api/experience/add";

      const response = await AxiosInstance.post(url, {
        timePeriod: formData.timePeriod,
        title: formData.title,
        company: formData.company,
        description: formData.description,
      });

      if (response.data.success) {
        alert(
          formData.id
            ? "Experience updated successfully"
            : "Experience added successfully"
        );
        navigate("/experience");
      } else {
        alert(
          `Experience ${formData.id ? "update" : "add"} failed: ${
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
          <label htmlFor="company" className="form-label">
            Company:
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formData.company}
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
            style={{ height: "200px" }}
          />
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;
