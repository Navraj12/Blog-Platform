import React, { useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import { createBlog, deleteBlog, getBlogs } from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (newBlog) => {
    try {
      await createBlog(newBlog, token);
      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id, token);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      {token && <BlogForm onSubmit={handleCreateBlog} />}
      <div>
        {blogs.map((blog) => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            {token && (
              <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
