import express from "express";
// import cors from 'cors';
import connectDB from './db/db-connection.js';
import userRouter from "./routes/userRoute.js";

// PORT & express
const port = process.env.PORT || 8000;
const app = express();

//JSON & CORS
//app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Server');
});

app.use("/users", userRouter)



//SERVER
app.listen(port, () => { console.log( `Server is live on http://localhost:${port}`)})