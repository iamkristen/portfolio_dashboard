import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/skills/get");
      if (response.data.success) {
        setSkills(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (skill) => {
    navigate("/skills-form", { state: { skill } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/skills/delete/${id}`);
      if (response.data.success) {
        alert("Skill deleted successfully");
        // Remove the deleted skill from the list
        setSkills((prevSkills) => prevSkills.filter((sk) => sk._id !== id));
      } else {
        alert("Failed to delete skill: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleAdd = () => {
    navigate("/skills-form");
    // Redirect to add skill page or open add skill modal
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="row"></div>

          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Skill
          </button>
          {skills.length === 0 ? (
            <center>
              {" "}
              <h1>No skills available</h1>
            </center>
          ) : (
            <table className="table table-bordered table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill._id}>
                    <td style={{ width: "25%" }}>{skill.type}</td>
                    <td style={{ width: "25%" }}>{skill.title}</td>
                    <td style={{ width: "25%" }}>{skill.level}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(skill)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(skill._id)}
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

export default SkillsList;
