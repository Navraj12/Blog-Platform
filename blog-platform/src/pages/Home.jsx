import React, { useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import { createBlog, deleteBlog, getBlogs } from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const fetchBlogs = async () => {
    const response = await getBlogs();
    setBlogs(response.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (newBlog) => {
    await createBlog(newBlog, token);
    fetchBlogs();
  };

  const handleDeleteBlog = async (id) => {
    await deleteBlog(id, token);
    fetchBlogs();
  };

  return (
    <div>
      <h1>Blogs</h1>
      {token && <BlogForm onSubmit={handleCreateBlog} />}
      <BlogForm blogs={blogs} onDelete={handleDeleteBlog} />
    </div>
  );
}

export default Home;
