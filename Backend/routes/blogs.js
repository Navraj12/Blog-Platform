import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


const router = express.Router();
constJWT_SECRET = process.env.JWT_SECRET;


//Middleware for jwt Authentication

const authMiddleware = (req, res, next) => {
    const token = req.headers['authentication'];
    if (!token) return res.status(403).json({
        message: 'NO token provided'
    });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Invalid  token'
        });
        req.userId = decoded.id;
        next();
    });
};

//create Blog
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
        res.status(500).json({
            error: err.message
        });
    }
});


//Get All Blogs
router.get('/', async(req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.status(500).json({ error: err.message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});


//Update blog

router.put('/', authMiddleware, async(req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, author: eq.userId });
        if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Delete blog
router.delete('/:id', authMiddleware, async(req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.userId });
        if (!blog) return res.status(404).json({
            message: 'Blog not found or unauthorized'
        });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

module.exports = router;