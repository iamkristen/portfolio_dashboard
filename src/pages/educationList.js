import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const EducationList = () => {
  const [educations, setEducations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/education/get");
      if (response.data.success) {
        setEducations(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (education) => {
    navigate("/education-form", { state: { education } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/education/delete/${id}`
      );
      if (response.data.success) {
        alert("Education deleted successfully");
        // Remove the deleted education from the list
        setEducations((prevEducations) =>
          prevEducations.filter((edu) => edu._id !== id)
        );
      } else {
        alert("Failed to delete education: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const handleAdd = () => {
    navigate("/education-form");
    // Redirect to add education page or open add education modal
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="row"></div>

          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Education
          </button>
          {educations.length === 0 ? (
            <center>
              {" "}
              <h1>No educations available</h1>
            </center>
          ) : (
            <table className="table table-bordered table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Time Period</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {educations.map((education) => (
                  <tr key={education._id}>
                    <td style={{ width: "25%" }}>{education.timePeriod}</td>
                    <td style={{ width: "25%" }}>{education.title}</td>
                    <td style={{ width: "25%" }}>{education.location}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(education)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(education._id)}
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

export default EducationList;
