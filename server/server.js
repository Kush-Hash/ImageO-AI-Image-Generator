import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./config/mongodb.js";
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); //Allow the frontend to make request to the backend.
app.use(express.json());//it parses the imcoming request and convert the body into JS Objects 
await connectDB();

app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`)
})

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get("/", (req, res) => {
    res.send("Root Directory");
})
