import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs, updateBlog } from "../services/api";

function BlogDetails() {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate(); // For navigation after actions
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [form, setForm] = useState({ title: "", content: "" }); // Form state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogs(); // Fetch all blogs
        const selectedBlog = response.data.find((b) => b._id === id); // Find the specific blog
        setBlog(selectedBlog);
        setForm({
          title: selectedBlog?.title || "",
          content: selectedBlog?.content || "",
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await updateBlog(id, form, token); // Update blog on the server
      setBlog({ ...blog, ...form }); // Update the state
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{isEditing ? "Edit Blog" : blog.title}</h1>
      <p>{isEditing ? null : blog.content}</p>

      {isEditing ? (
        <>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Content"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEditToggle}>Edit</button>
      )}

      <button onClick={() => navigate("/")}>Back to Blogs</button>
    </div>
  );
}

export default BlogDetails;
