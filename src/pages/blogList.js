import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axios/axios_instance";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/api/blogs/get");
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (blog) => {
    navigator("/blogs-form", { state: { blog } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/blogs/delete/${id}`);
      if (response.data.success) {
        alert("Blog deleted successfully");
        // Remove the deleted blog from the list
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } else {
        alert("Failed to delete blog: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleAdd = () => {
    navigator("/blogs-form");
    // Redirect to add blog page or open add blog modal
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <div className="row"></div>

          <button className="btn btn-success mb-3 mt-3" onClick={handleAdd}>
            Add Blog
          </button>
          {blogs.length === 0 ? (
            <center>
              {" "}
              <h1>No blogs available</h1>
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
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td style={{ width: "100%" }}>{blog.title}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {/* blog.banner && <img src={blog.banner} alt="banner" /> */}
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(blog)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(blog._id)}
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

export default BlogList;
