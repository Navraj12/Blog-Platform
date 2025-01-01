import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogForm from "./components/BlogForm"; // Adjust path as necessary

function App() {
  const handleBlogSubmit = (formData) => {
    console.log("Blog submitted:", formData);
    // Add your logic here (e.g., API call)
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/create-blog">Create Blog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-blog"
          element={<BlogForm onSubmit={handleBlogSubmit} />}
        />
      </Routes>
    </div>
  );
}

export default App;
