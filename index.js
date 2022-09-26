//imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const usersRoute = require("./routes/users");

const app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.all("*", (req, res) => {
  res.status(404).send("Error 404! Page Not Found!");
});

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
