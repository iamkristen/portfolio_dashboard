import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";

const SkillsForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    title: "",
    level: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.skill) {
      // If location state has skill data, it means we're in update mode
      const skillData = location.state.skill;
      setFormData({
        id: skillData._id,
        type: skillData.type,
        title: skillData.title,
        level: skillData.level,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = formData.id
        ? `/api/skills/update/${formData.id}`
        : "/api/skills/add";

      const response = await AxiosInstance.post(url, {
        type: formData.type,
        title: formData.title,
        level: formData.level,
      });

      if (response.data.success) {
        alert(
          formData.id
            ? "Skill updated successfully"
            : "Skill added successfully"
        );
        navigate("/skills");
      } else {
        alert(
          `Skill ${formData.id ? "update" : "add"} failed: ${
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
          <label htmlFor="type" className="form-label">
            Type:
          </label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            <option value="Framework">Framework</option>
            <option value="Languages">Languages</option>
            <option value="Coding">Coding</option>
            <option value="Knowledge">Knowledge</option>
          </select>
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
          <label htmlFor="level" className="form-label">
            Level:
          </label>
          <select
            className="form-select"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="">Select a level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default SkillsForm;
