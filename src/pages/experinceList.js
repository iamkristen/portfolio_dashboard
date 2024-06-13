import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/experience/get");
      if (response.data.success) {
        setExperiences(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (experience) => {
    navigate("/experience-form", { state: { experience } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/experience/delete/${id}`
      );
      if (response.data.success) {
        alert("Experience deleted successfully");
        // Remove the deleted experience from the list
        setExperiences((prevExperiences) =>
          prevExperiences.filter((exp) => exp._id !== id)
        );
      } else {
        alert("Failed to delete experience: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleAdd = () => {
    navigate("/experience-form");
    // Redirect to add experience page or open add experience modal
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="row"></div>

          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Experience
          </button>
          {experiences.length === 0 ? (
            <center>
              {" "}
              <h1>No experiences available</h1>
            </center>
          ) : (
            <table className="table table-bordered table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Time Period</th>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience) => (
                  <tr key={experience._id}>
                    <td style={{ width: "25%" }}>{experience.timePeriod}</td>
                    <td style={{ width: "25%" }}>{experience.title}</td>
                    <td style={{ width: "25%" }}>{experience.company}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(experience)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(experience._id)}
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

export default ExperienceList;
