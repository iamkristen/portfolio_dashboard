import React, { useState } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const KnowledgeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post("/api/knowledge/add", {
        title: formData.title,
      });

      if (response.data.success) {
        alert("Knowledge entry added successfully");
        navigate("/knowledge");
      } else {
        alert("Failed to add knowledge entry: " + response.data.error);
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

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default KnowledgeForm;
