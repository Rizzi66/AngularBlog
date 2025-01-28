const mongoose = require("mongoose");

//Modèle "User"
const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
