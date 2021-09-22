const express = require("express");

//Models for Db
const Student = require("../models/students");
//Users Routes
const routes = express.Router();

//get home
routes.get("/", (req, res, next) => {
  // res.render("home", { pageTitle: "Crud System" });
  Student.find((err, docs) => {
    if (err) {
      res.render("home", { pageTitle: "Crud System" });
      console.log("Error in gettiong data");
    } else {
      // console.log("data Founds", docs);
      res.render("home", { pageTitle: "Crud System", stData: docs });
    }
  });
});

//POST route
routes.post("/add", (req, res, next) => {
  const { stname, depart, phoneNo } = req.body;
  if (stname == "" || depart == "" || phoneNo == "") {
    console.log("Required field cant be empty");
    res.redirect("/");
  } else {
    // const depart = req.body.depart;
    // const phoneNo = req.body.phoneNo;
    // console.log(stname, depart, phoneNo);

    const studentInfo = new Student({
      name: stname,
      depart: depart,
      phoneNo: phoneNo,
    });

    try {
      studentInfo.save((err) => {
        if (!err) {
          console.log("Data Inserted in to db Successfull");
          res.redirect("/");
        } else {
          console.log("Error while inserting data to databse", err);
          res.redirect("404");
        }
      });
    } catch (error) {
      console.log("There is an error occur");
    }
  }
});

//Edit Student Data

routes.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  Student.findOneAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
    },
    (err, docs) => {
      if (err) {
        console.log("An error occur while getting the dat Id");
        next(err);
      } else {
        res.render("edit", {
          pageTitle: "Edit your Data",
          singleData: docs,
        });
      }
    }
  );
});

//Post request to DB
// routes.post("/edit/:id", (req, res, next) => {
//   console.log("post requeest");
// });
routes.post("/edit/:id", (req, res, next) => {
  const { stname, depart, phoneNo } = req.body;
  const id = req.params.id;
  console.log(id);
  if (stname == "" || depart == "" || phoneNo == "") {
    console.log("require Field can't be Empty");
  } else {
    Student.findByIdAndUpdate({ _id: id }, req.body, (err, docs) => {
      if (err) {
        console.log("Somwthing went wrong, check out later");
        next(err);
      } else {
        const status = res.status();

        res.redirect("/", status, { pageTitle: "Crud Upadted" });
      }
    });
  }
});
//ROute for Delete
routes.get("/del/:id", (req, res, next) => {
  const id = req.params.id;

  Student.findByIdAndDelete({ _id: id }, (err, doc) => {
    if (!err) {
      let status = res.status();
      res.redirect("/", status, { pageTitle: "Crud System" });
    } else {
      console.log("something went wrong");
    }
  });
});
//Contact US Route
routes.get("/contact", (req, res, next) => {
  res.render("contact-us", { pageTitle: "Contact Us" });
});

routes.get("/about", (req, res, next) => {
  res.render("about", { pageTitle: "About Us" });
});
module.exports = routes;
