// IMPORTATION_____________________________________________
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseError = require("mongoose-errors")

mongoose.plugin(mongooseError);

// MODELE USER_____________________________________________
const userSchema = new mongoose.Schema({
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
userSchema.plugin(mongooseError);

// EXPORTATION______________________________________________
module.exports = mongoose.model("User", userSchema);
