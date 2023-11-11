require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/students");

// express app
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // You can replace '*' with your specific domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/students", studentRoutes);

// connect to db
mongoose
  .connect('mongodb+srv://tebohomolise32:Bw3xzdRmX7xK7bwP@cluster0.r4hmt72.mongodb.net/')
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(4000, () => {
      console.log("listening for requests on port", 4000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
