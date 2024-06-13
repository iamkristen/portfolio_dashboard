import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const SocialLinkList = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/social/get");
      if (response.data.success) {
        setSocialLinks(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (socialLink) => {
    navigate("/social-link-form", { state: { socialLink } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/social/delete/${id}`);
      if (response.data.success) {
        alert("Social link deleted successfully");
        // Remove the deleted social link from the list
        setSocialLinks((prevSocialLinks) =>
          prevSocialLinks.filter((link) => link._id !== id)
        );
      } else {
        alert("Failed to delete social link: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting social link:", error);
    }
  };

  const handleAdd = () => {
    navigate("/social-link-form");
    // Redirect to add social link page or open add social link modal
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="row"></div>

          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Social Link
          </button>
          {socialLinks.length === 0 ? (
            <center>
              {" "}
              <h1>No social links available</h1>
            </center>
          ) : (
            <table className="table table-bordered table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {socialLinks.map((link) => (
                  <tr key={link._id}>
                    <td>{link.icon}</td>
                    <td>{link.name}</td>
                    <td>{link.link}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(link)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(link._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinkList;
