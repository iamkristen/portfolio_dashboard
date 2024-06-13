import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { Link } from "react-router-dom";

const KnowledgeList = () => {
  const [knowledgeList, setKnowledgeList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/knowledge/get");
      if (response.data.success) {
        setKnowledgeList(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/knowledge/delete/${id}`
      );
      if (response.data.success) {
        alert("Knowledge entry deleted successfully");
        // Remove the deleted entry from the list
        setKnowledgeList((prevList) =>
          prevList.filter((entry) => entry._id !== id)
        );
      } else {
        alert("Failed to delete knowledge entry: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting knowledge entry:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      <Link to="/knowledge-form" className="btn btn-primary mb-3">
        Add Knowledge
      </Link>
      {knowledgeList.length === 0 ? (
        <p>No knowledge entries available</p>
      ) : (
        <ul className="list-group">
          {knowledgeList.map((entry) => (
            <li
              key={entry._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{entry.title}</span>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(entry._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KnowledgeList;
