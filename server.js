const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const passport = require("./auth.js");

const Person = require("./Models/Person");

app.use(cors());
app.use(express.json());

const mongo_URL = process.env.mongoDB_URL_local;
// const mongo_URL = process.env.mongoDB_URL;

const mongoURL = mongoose
  .connect(mongo_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("welcome to my Hotel");
});

const personRoutes = require("./Routes/personRoutes");
app.use("/person", personRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log("Express server is running on http://localhost:3000");
});
