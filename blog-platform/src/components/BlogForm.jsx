import PropTypes from "prop-types";
import React, { useState } from "react";

function BlogForm({ onSubmit }) {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", content: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit">Add Blog</button>
    </form>
  );
}
BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Validate that onSubmit is a required function
};

export default BlogForm;
