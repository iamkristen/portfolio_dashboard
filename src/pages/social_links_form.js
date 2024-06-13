import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLinkForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    icon: "",
    name: "",
    link: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.socialLink) {
      // If location state has social link data, it means we're in update mode
      const socialLinkData = location.state.socialLink;
      setFormData({
        id: socialLinkData._id,
        icon: socialLinkData.icon,
        name: socialLinkData.name,
        link: socialLinkData.link,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = formData.id
        ? `/api/social/update/${formData.id}`
        : "/api/social/add";

      let response;
      if (formData.id) {
        response = await AxiosInstance.post(url, formData);
      } else {
        const { id, ...formDataWithoutId } = formData;
        response = await AxiosInstance.post(url, formDataWithoutId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: response.data.data.id,
        }));
      }

      if (response.data.success) {
        alert(
          formData.id
            ? "Social link updated successfully"
            : "Social link added successfully"
        );
        navigate("/social-link");
      } else {
        alert(
          `Social link ${formData.id ? "update" : "add"} failed: ${
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
          <label htmlFor="icon" className="form-label">
            Icon:
          </label>
          <input
            type="text"
            className="form-control"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            required
          />
          <small className="text-muted">
            Example: <i className={formData.icon}></i>
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Link:
          </label>
          <input
            type="text"
            className="form-control"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default SocialLinkForm;
