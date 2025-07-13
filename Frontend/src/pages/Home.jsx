import { useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import { createBlog, deleteBlog, getBlogs } from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [token] = useState(localStorage.getItem("token"));

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📝 Blogs
      </h1>

      {token && (
        <div className="mb-8">
          <BlogForm onSubmit={handleCreateBlog} />
        </div>
      )}

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {blog.title}
            </h2>
            <p className="text-gray-600 mt-2">{blog.content}</p>

            {token && (
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
