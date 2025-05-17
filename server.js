const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./Models/Person");

app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/hotel";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("welcome to my Hotel");
});

const personRoutes = require("./Routes/personRoutes");
app.use("/person", personRoutes);

// Start the Express server
app.listen(3000, () => {
  console.log("Express server is running on http://localhost:3000");
});
