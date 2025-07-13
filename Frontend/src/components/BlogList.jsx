import PropTypes from "prop-types";

function BlogList({ blogs, onDelete }) {
  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li
          key={blog._id}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
          <p className="text-gray-700 mt-2">{blog.content}</p>
          <button
            onClick={() => onDelete(blog._id)}
            className="mt-4 inline-block px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BlogList;
