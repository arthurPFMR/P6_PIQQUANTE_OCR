// IMPORTATION_____________________________________________
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// MODELE USER_____________________________________________
const userSchema = mongoose.Schema({
  email: { 
    type: String, 
    required: [true, "name required"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, "password required"] 
  },
});

// renforce l'email unique
userSchema.plugin(uniqueValidator);

// EXPORTATION______________________________________________
module.exports = mongoose.model("User", userSchema);
