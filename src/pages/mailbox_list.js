import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MailboxList = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emails =[
      {
        "_id": 1,
        "fullName": "John Doe",
        "email": "john@example.com",
        "message": "Hello, how are you? This is a longer message that will be truncated for display.",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 2,
        "fullName": "Ravi Kushwaha",
        "email": "Kushwaha33ravi@example.com",
        "message": "Hello, how are you? This is a longer message that will be truncated for display.",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 3,
        "fullName": "Jane Smith",
        "email": "jane@example.com",
        "message": "Hi there! Just checking in.",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 4,
        "fullName": "Alex Johnson",
        "email": "alex@example.com",
        "message": "Greetings! Hope you're having a great day.",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 5,
        "fullName": "Emily Williams",
        "email": "emily@example.com",
        "message": "Hey! What's up?",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 6,
        "fullName": "David Lee",
        "email": "david@example.com",
        "message": "Good to see you. Let's catch up soon!",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 7,
        "fullName": "Sophia Rodriguez",
        "email": "sophia@example.com",
        "message": "Hello from the other side!",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 8,
        "fullName": "Michael Brown",
        "email": "michael@example.com",
        "message": "How's everything going on your end?",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 9,
        "fullName": "Olivia Martinez",
        "email": "olivia@example.com",
        "message": "Sending positive vibes your way!",
        "createdAt": "2022-02-03T12:34:56.789Z"
      },
      {
        "_id": 10,
        "fullName": "Ethan Davis",
        "email": "ethan@example.com",
        "message": "Hope you're having a fantastic day!",
        "createdAt": "2022-02-03T12:34:56.789Z"
      }
    ];

  const handleEdit = (id) => {
    // Add logic for edit functionality
    console.log(`Edit email with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Add logic for delete functionality
    console.log(`Delete email with ID: ${id}`);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const renderShortMessage = (message) => {
    const maxLength = 30; // Set your desired maximum length
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '20px' }}>
      {/* Bootstrap Modal */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: selectedEmail ? 'block' : 'none' }}>
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
                className="btn btn-secondary"
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
            <tr key={email._id} onClick={() => handleEmailClick(email)} style={{ cursor: 'pointer' }}>
              <th scope="row">{index + 1}</th>
              <td>{email.fullName}</td>
              <td>{email.email}</td>
              <td title={email.message}>{renderShortMessage(email.message)}</td>
              <td>{new Date(email.createdAt).toLocaleString()}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(email._id)}>Edit</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(email._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MailboxList;
