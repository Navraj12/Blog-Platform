require('dotenv').config();
import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth';
import blogRoutes from './routes/blogs';

const app = express();

//Middleware
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


//Database Connection
connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Mongoose Connected'))
    .catch(err => console.log(err));


//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));