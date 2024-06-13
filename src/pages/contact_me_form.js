import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
// import { useNavigate } from "react-router-dom";

const ContactMeForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    address: "",
    email: "",
    phone: "",
    freelance: "",
    openTo: "",
  });
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await AxiosInstance.get("/api/contact-me/get");
        if (response.data.success && response.data.data) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = formData._id
        ? `/api/contact-me/update/${formData._id}`
        : "/api/contact-me/add";
      let response;
      if (formData._id) {
        response = await AxiosInstance.post(url, formData);
      } else {
        const { id, ...formDataWithoutId } = formData;
        response = await AxiosInstance.post(url, formDataWithoutId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          _id: response.data.data._id,
        }));
      }

      if (response.data.success) {
        alert(
          formData._id
            ? "Contact information updated successfully"
            : "Contact information added successfully"
        );
      } else {
        alert(
          `Contact information ${formData._id ? "update" : "add"} failed: ${
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
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="freelance" className="form-label">
            Freelance:
          </label>
          <input
            type="text"
            className="form-control"
            id="freelance"
            name="freelance"
            value={formData.freelance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="openTo" className="form-label">
            Open To:
          </label>
          <input
            type="text"
            className="form-control"
            id="openTo"
            name="openTo"
            value={formData.openTo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {formData._id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ContactMeForm;
