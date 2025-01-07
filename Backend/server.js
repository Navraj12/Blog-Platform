import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';

import cors from "cors";
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Allow requests from all origins
app.use(express.json()); // To parse JSON request bodies
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form submissions



// Database Connection
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the process if MONGO_URI is not defined
}

connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process on failure to connect
    });

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));