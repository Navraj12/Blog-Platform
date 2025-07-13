import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs, updateBlog } from "../services/api";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogs();
        const selectedBlog = response.data.find((b) => b._id === id);
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
      await updateBlog(id, form, token);
      setBlog({ ...blog, ...form });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {isEditing ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Edit Blog</h1>

          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Content"
            rows="6"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
          <p className="text-gray-700 text-lg whitespace-pre-line">
            {blog.content}
          </p>
          <button
            onClick={handleEditToggle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Edit
          </button>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 inline-block text-sm text-blue-500 hover:underline"
      >
        ← Back to Blogs
      </button>
    </div>
  );
}

export default BlogDetails;
