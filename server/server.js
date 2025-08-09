import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./config/mongodb.js";
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration - Updated with your production URLs
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173', // Vite dev server
        'https://imageo-ai-image-generator-frontend.onrender.com' // Your production frontend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
};

app.use(cors(corsOptions)); // Allow the frontend to make request to the backend
app.use(express.json()); // It parses the incoming request and convert the body into JS Objects 

await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get("/", (req, res) => {
    res.send("Root Directory");
});

app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
});