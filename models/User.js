const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // _id: Object,
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
