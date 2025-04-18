import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes.js';
import postRoutes from './routes/postroutes.js';
import mongoose from 'mongoose';

dotenv.config()
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => { console.log(err) })


app.use('/api/auth', authRoutes)
app.use('/api/posts',postRoutes)

app.listen(5000, () => {
    console.log("server is running on port 5000")
})