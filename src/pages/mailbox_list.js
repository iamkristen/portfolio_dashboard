import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "../api/axios/axios_instance";

const MailboxList = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    // Fetch emails from the backend when the component mounts
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await AxiosInstance.get("/api/mailbox/get");
      if (response.data.success) {
        setEmails(response.data.data);
      } else {
        console.error("Failed to fetch emails:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/mailbox/delete/${id}`);
      if (response.data.success) {
        // Remove the deleted email from the local state
        setEmails(emails.filter((email) => email._id !== id));
        console.log(`Email with ID ${id} deleted successfully`);
      } else {
        console.error(
          `Failed to delete email with ID ${id}:`,
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const renderShortMessage = (message) => {
    const maxLength = 30;
    return message.length > maxLength
      ? `${message.substring(0, maxLength)}...`
      : message;
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      {/* Bootstrap Modal */}
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: selectedEmail ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedEmail?.fullName}</h5>
            </div>
            <div className="modal-body">
              <p>{selectedEmail?.message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setSelectedEmail(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={email._id}>
              <th scope="row">{index + 1}</th>
              <td>{email.fullName}</td>
              <td>{email.email}</td>
              <td
                title={email.message}
                onClick={() => handleEmailClick(email)}
                style={{ cursor: "pointer" }}
              >
                {renderShortMessage(email.message)}
              </td>
              <td>{new Date(email.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(email._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MailboxList;
