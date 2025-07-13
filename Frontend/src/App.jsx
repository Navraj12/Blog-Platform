import { Link, Route, Routes } from "react-router-dom";

import BlogForm from "./components/BlogForm"; // Adjust path as necessary
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const handleBlogSubmit = (formData) => {
    console.log("Blog submitted:", formData);
    // You may already use this in Home instead
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex gap-6 text-blue-600 font-medium">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <Link to="/create-blog" className="hover:underline">
          Create Blog
        </Link>
      </nav>

      {/* Page content */}
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-blog"
            element={<BlogForm onSubmit={handleBlogSubmit} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
