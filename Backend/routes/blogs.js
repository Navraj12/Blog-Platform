import express from 'express';
import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js'; // Import the Blog model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for JWT Authentication
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Use 'authorization' header
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

// Create Blog
router.post('/', authMiddleware, async(req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            author: req.userId
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Blogs
router.get('/', async(req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username'); // Populate author's username
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Blog
router.put('/:id', authMiddleware, async(req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, author: req.userId });
        if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Blog
router.delete('/:id', authMiddleware, async(req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.userId });
        if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router; // Use ES Modules for export