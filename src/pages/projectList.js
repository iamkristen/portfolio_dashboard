import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/projects/get");
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (project) => {
    navigator("/projects-form", { state: { project } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/projects/delete/${id}`);
      if (response.data.success) {
        alert("Project deleted successfully");
        // Remove the deleted project from the list
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== id)
        );
      } else {
        alert("Failed to delete project: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleAdd = () => {
    navigator("/projects-form");
    // Redirect to add project page or open add project modal
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="row"></div>

          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Project
          </button>
          {projects.length === 0 ? (
            <center>
              {" "}
              <h1>No projects available</h1>
            </center>
          ) : (
            <table className="table table-bordered table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td style={{ width: "100%" }}>{project.title}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {/* project.banner && <img src={project.banner} alt="banner" /> */}
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(project)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(project._id)}
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

export default ProjectList;
