const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");

const mongoose = require("mongoose");

const User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/person")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.listen(4001, () => {
  console.log("APP IS LISTENING ON PORT 4001!");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//index
app.get("/persons", async (req, res) => {
  try {
    const users = await User.find();
    res.render("persons/index", { User: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

//new

app.get("/persons/new", (req, res) => {
  res.render("persons/new");
});

// Add a new user
app.post("/persons", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      Age: req.body.Age,
      Gender: req.body.Gender,
      Mobile_number: req.body.Mobile_number,
    });
    await newUser.save();
    res.redirect(`/persons/${newUser._id}`);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
});

//edit
app.get("/persons/:id/edit", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("persons/edit", { user });
});

app.put("/persons/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/persons/${user._id}`);
});

//show
app.get("/persons/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("persons/show", { user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
app.delete("/persons/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPerson = await User.findByIdAndDelete(id);
  res.redirect("/persons");
});
