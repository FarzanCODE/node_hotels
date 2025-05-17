const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
});

const personModel = mongoose.model("persongModel", personSchema);
module.exports = personModel;
