import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Discussion from './models/discussionModel.js';
import projectRoutes from './routes/projectRoutes.js';
import connectDB from './db/db-connection.js';
import userRouter from "./routes/userRoute.js";
import discussionRoutes from './routes/discussionRoutes.js';


dotenv.config();


// PORT & express
const port = process.env.PORT || 8000;
const app = express();


//JSON  & Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database connection
connectDB();


app.use("/users", userRouter)

//app.use("/comments", commentRouter )

app.use('/api/projects', projectRoutes);
app.use('/discussions', discussionRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Server');
});




//SERVER
app.listen(port, () => { console.log( `Server is live on http://localhost:${port}`)})