import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import projectRoutes from './routes/projectRoutes.js';
import connectDB from './db/db-connection.js';

// import Project from './models/projectModel.js';



// PORT & express
const port = process.env.PORT || 8000;
const app = express();
app.use(bodyParser.json());
// Database connection
connectDB();

//JSON
app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Server');
});



//SERVER
app.listen(port, () => { console.log( `Server is live on http://localhost:${port}`)})