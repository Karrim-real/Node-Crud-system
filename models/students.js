const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  name: {
    type: String,
    require: true,
  },
  depart: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("crud", Users);
