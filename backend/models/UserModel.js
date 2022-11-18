const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

// schéma modèle de l'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// renforce l'email unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
