import express from "express";
// import cors from 'cors';
 import connectDB from './db/db-connection.js';


// PORT & express
const port = process.env.PORT || 8000;
const app = express();

// Database connection
connectDB();

//JSON

app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Server');
});



//SERVER
app.listen(port, () => { console.log( `Server is live on http://localhost:${port}`)})