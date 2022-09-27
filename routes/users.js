const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");

//read all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    //no user
    if (users.length < 1)
      return res.status(404).json({ message: "No users found." });

    //return all users
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//create user
router.post("/", async (req, res) => {
  //name or address missing
  if (!req?.body?.name || !req?.body?.address) {
    return res.status(400).json({ message: "Name and address are required" });
  }

  //create new user
  const newUser = new User({
    name: req.body.name,
    address: req.body.address,
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//read specific user
router.get("/:id", async (req, res) => {
  //check for valid ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid ID" });

  try {
    const readUser = await User.findById(req.params.id);
    //no user with the given ID
    if (!readUser) {
      return res.status(404).send(`No user matches ID ${req.params.id}`);
    }
    //get user
    res.json(readUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  //check for ID parameter
  if (!req?.params) return res.status(400).json({ message: "ID required" });
  //check for valid ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid ID" });

  try {
    //delete user
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    //no user with the given ID
    if (!deleteUser) {
      return res
        .status(404)
        .json({ message: `No user matches ID ${req.params.id}.` });
    }
    res.json(deleteUser);
  } catch (err) {
    res.json({ messge: err });
  }
});

//update user
router.patch("/:id", async (req, res) => {
  //check for ID parameter
  if (!req?.params) return res.status(400).json({ message: "ID required" });
  //check for valid ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid ID" });

  try {
    const user = await User.findById(req.params.id);
    //no user with the given ID
    if (!user) {
      return res.status(404).send(`No user matches ID ${req.params.id}`);
    }

    //update user
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    const updated = await User.findById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
