import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "../api/axios/axios_instance";
import "../custom_css/avatar.css";

const AboutMeForm = () => {
  const [formData, setFormData] = useState({
    id: "", // Initialize id to null
    avatar: "",
    avatarFile: null,
    name: "",
    profession: [], // Initialize profession as an array
    description: "",
    age: "",
    residence: "",
    freelance: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/api/about-me/get/");
        if (response.data.success && response.data.data) {
          const responseData = response.data.data;
          setFormData((prevFormData) => ({
            ...prevFormData,
            id: responseData._id, // Set id only if it exists
            avatar: responseData.avatar,
            name: responseData.name,
            profession: responseData.profession, // Set profession as an array
            description: responseData.description,
            age: String(responseData.age),
            residence: responseData.residence,
            freelance: responseData.freelance,
            address: responseData.address,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      if (formData.avatarFile !== null) {
        formDataToSend.append("image", formData.avatarFile);

        const uploadResponse = await AxiosInstance.post(
          "/api/upload/single/",
          formDataToSend
        );

        if (uploadResponse.data.success) {
          const newAvatarUrl = uploadResponse.data.data;

          const { avatarFile, ...restOfTheData } = formData;

          const url = formData.id
            ? `/api/about-me/update/${formData.id}`
            : "/api/about-me/add";

          // If formData.id is empty, remove it from restOfTheData
          if (!formData.id) {
            delete restOfTheData.id;
          }

          const response = await AxiosInstance.post(url, {
            ...restOfTheData,
            avatar: newAvatarUrl,
            profession: formData.profession, // Ensure profession is sent as an array
          });

          if (response.data.success) {
            alert(
              formData.id
                ? "About me updated successfully"
                : "About me added successfully"
            );
            setFormData((prevFormData) => ({
              ...prevFormData,
              avatar: newAvatarUrl,
              avatarFile: null,
            }));
          } else {
            alert(
              `About me ${formData.id ? "update" : "add"} failed: ${
                response.data.error
              }`
            );
          }
        } else {
          console.error("Upload failed:", uploadResponse.data.error);
        }
      } else {
        const { avatarFile, ...restOfTheData } = formData;

        const url = `/api/about-me/update/${formData.id}`;

        // If formData.id is empty, remove it from restOfTheData
        if (!formData.id) {
          delete restOfTheData.id;
        }

        const response = await AxiosInstance.post(url, {
          ...restOfTheData,
          profession: formData.profession, // Ensure profession is sent as an array
        });

        if (response.data.success) {
          alert("About me updated successfully");
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatarFile: null,
          }));
        } else {
          alert(`About me update failed: ${response.data.error}`);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatarFile") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatarFile: files[0],
      }));
    } else if (name === "profession") {
      // Split the profession string into an array
      const professionArray = value.split(",").map((item) => item.trim());
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: professionArray,
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
          <label htmlFor="avatar" className="form-label">
            Avatar:
          </label>
          <input
            type="file"
            className="form-control"
            id="avatar"
            name="avatarFile"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.avatar && (
            <div className="mt-2">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="img-fluid rounded-circle avatar-frame"
              />
            </div>
          )}
        </div>
        <div className=" mb-3">
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
          <label htmlFor="profession" className="form-label">
            Profession:
          </label>
          <input
            type="text"
            className="form-control"
            id="profession"
            name="profession"
            value={formData.profession.join(",")} // Join array into string for display
            onChange={handleChange}
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

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="residence" className="form-label">
            Residence:
          </label>
          <input
            type="text"
            className="form-control"
            id="residence"
            name="residence"
            value={formData.residence}
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

        <button type="submit" className="btn btn-primary mb-5">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AboutMeForm;
