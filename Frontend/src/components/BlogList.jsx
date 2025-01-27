import React from "react";

function BlogList(blogs, onDelete) {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <button onClick={() => onDelete(blog._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
