import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import JoditEditor from "jodit-react";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    image: "",
    imageFile: null,
    name: "",
    issuer: "",
    dateIssued: "",
    description: "",
    credential: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.certificate) {
      const certificateData = location.state.certificate;
      setFormData({
        id: certificateData._id,
        image: certificateData.image,
        name: certificateData.name,
        issuer: certificateData.issuer,
        dateIssued: certificateData.dateIssued.split("T")[0], // Format Date
        description: certificateData.description,
        credential: certificateData.credential,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      if (
        !formData.imageFile ||
        !formData.name ||
        !formData.issuer ||
        !formData.dateIssued ||
        !formData.description ||
        !formData.credential
      ) {
        alert("All fields are required");
        return;
      }
    }

    try {
      let newImageUrl = formData.image;

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
        ? `/api/certificate/update/${formData.id}`
        : "/api/certificate/add";

      const response = await AxiosInstance.post(url, {
        image: newImageUrl,
        name: formData.name,
        issuer: formData.issuer,
        dateIssued: formData.dateIssued,
        description: formData.description,
        credential: formData.credential,
      });

      if (response.data.success) {
        alert(
          formData.id
            ? "Certificate updated successfully"
            : "Certificate added successfully"
        );
        navigate("/certificate");
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: newImageUrl,
          imageFile: null,
        }));
      } else {
        alert(
          `Certificate ${formData.id ? "update" : "add"} failed: ${
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
        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Certificate Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Certificate"
                className="img-fluid"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Certificate Name:
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

        {/* Issuer */}
        <div className="mb-3">
          <label htmlFor="issuer" className="form-label">
            Issuer:
          </label>
          <input
            type="text"
            className="form-control"
            id="issuer"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            required
          />
        </div>

        {/* Issued Date */}
        <div className="mb-3">
          <label htmlFor="dateIssued" className="form-label">
            Date Issued:
          </label>
          <input
            type="date"
            className="form-control"
            id="dateIssued"
            name="dateIssued"
            value={formData.dateIssued}
            onChange={handleChange}
            required
          />
        </div>

        {/* Credential Link */}
        <div className="mb-3">
          <label htmlFor="credential" className="form-label">
            Credential Link:
          </label>
          <input
            type="url"
            className="form-control"
            id="credential"
            name="credential"
            value={formData.credential}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
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

export default CertificateForm;
