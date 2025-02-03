import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/certificate/get");
      if (response.data.success) {
          console.log(response.data.data);
        setCertificates(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching certificates:", error);
    }
  };

  const handleUpdate = (certificate) => {
    navigator("/certificates-form", { state: { certificate } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/certificate/delete/${id}`);
      if (response.data.success) {
        alert("Certificate deleted successfully");
        setCertificates((prevCertificates) =>
          prevCertificates.filter((certificate) => certificate._id !== id)
        );
      } else {
        alert("Failed to delete certificate: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleAdd = () => {
    navigator("/certificates-form");
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Certificate
          </button>
          {certificates.length === 0 ? (
            <center>
              <h1>No certificates available</h1>
            </center>
          ) : (
            <table className="table table-bordered table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Issuer</th>
                  <th>Issued Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((certificate) => (
                  <tr key={certificate._id}>
                    <td>{certificate.name}</td>
                    <td>{certificate.issuer}</td>
                    <td>{new Date(certificate.dateIssued).toLocaleDateString()}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(certificate)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(certificate._id)}
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

export default CertificateList;
