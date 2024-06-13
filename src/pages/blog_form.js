import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react"; // Import Jodit Editor
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const BlogForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    banner: "",
    type: "",
    imageFile: null,
    title: "",
    description: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.blog) {
      const blogData = location.state.blog;
      setFormData({
        id: blogData._id,
        type: blogData.type,
        banner: blogData.banner,
        title: blogData.title,
        description: blogData.description,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      if (
        !formData.imageFile ||
        !formData.type ||
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
        ? `/api/blogs/update/${formData.id}`
        : "/api/blogs/add";

      const response = await AxiosInstance.post(url, {
        banner: newImageUrl,
        type: formData.type,
        title: formData.title,
        description: formData.description,
      });

      if (response.data.success) {
        alert(
          formData.id ? "Blog updated successfully" : "Blog added successfully"
        );
        navigate("/blogs");
        setFormData((prevFormData) => ({
          ...prevFormData,
          banner: newImageUrl,
          imageFile: null,
        }));
      } else {
        alert(
          `Blog ${formData.id ? "update" : "add"} failed: ${
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageFile: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image:
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
                alt="Blog"
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
          <label htmlFor="type" className="form-label">
            Blog Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
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

export default BlogForm;
