import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import JoditEditor from "jodit-react"; // Import Jodit Editor

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    banner: "",
    projectType: "",
    imageFile: null,
    title: "",
    description: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.project) {
      const projectData = location.state.project;
      setFormData({
        id: projectData._id,
        projectType: projectData.projectType,
        banner: projectData.banner,
        title: projectData.title,
        description: projectData.description,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      if (
        !formData.imageFile ||
        !formData.projectType ||
        !formData.title ||
        !formData.description
      ) {
        alert("All fields are required");
        return;
      }
    }

    try {
      let newImageUrl = formData.banner;

      if (formData.imageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", formData.imageFile);

        const uploadResponse = await AxiosInstance.post(
          "/api/upload/single/",
          formDataToSend
        );

        if (uploadResponse.data.success) {
          newImageUrl = uploadResponse.data.data;
        } else {
          console.error("Upload failed:", uploadResponse.data.error);
          return;
        }
      }

      const url = formData.id
        ? `/api/projects/update/${formData.id}`
        : "/api/projects/add";

      const response = await AxiosInstance.post(url, {
        banner: newImageUrl,
        projectType: formData.projectType,
        title: formData.title,
        description: formData.description,
      });

      if (response.data.success) {
        alert(
          formData.id
            ? "Project updated successfully"
            : "Project added successfully"
        );
        navigate("/projects");
        setFormData((prevFormData) => ({
          ...prevFormData,
          banner: newImageUrl,
          imageFile: null,
        }));
      } else {
        alert(
          `Project ${formData.id ? "update" : "add"} failed: ${
            response.data.error
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile") {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Banner:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.banner && (
            <div className="mt-2">
              <img
                src={formData.banner}
                alt="Project"
                className="img-fluid"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
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
          <label htmlFor="projectType" className="form-label">
            Project Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <JoditEditor
            value={formData.description}
            onChange={(newContent) =>
              setFormData((prevData) => ({
                ...prevData,
                description: newContent,
              }))
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
