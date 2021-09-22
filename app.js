const express = require("express");

const userRoute = require("./routes/user");
const mongoose = require("mongoose");
// const ConnectDb = require("./config/keys");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Test For connection Connections

mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => console.log("Database connected successfully !!"))
  .catch((err) => console.log(err));

//User Route => Student Routes
app.use(userRoute);

//404 error page

app.use((req, res) => {
  res.render("404", { pageTitle: " 404 || Page Not Found" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App is Running Up");
});
