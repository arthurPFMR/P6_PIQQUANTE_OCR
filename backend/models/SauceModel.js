// IMPORTATION_____________________________________________
const mongoose = require("mongoose");
const mongooseError = require("mongoose-errors");// permet d'intercepter les erreur 
                                                // de la BD pour en faire des erreur HTTP
mongoose.plugin(mongooseError);

// MODELE SAUCE____________________________________________
const sauceSchema = new mongoose.Schema({
  userId: 
  { 
    type: String, 
    required: [true, "User ID required"] 
  },
  name: 
  { 
    type: String,
    minlength: 2, 
    maxlength: 15, 
    required: [true, "Name required"]  
  },
  manufacturer: 
  { 
    type: String, 
    minlength: 2, 
    maxlength: 15,
    required: [true, "Manufacturer required"]  
  },
  description: 
  { 
    type: String,
    minlength: 2, 
    maxlength: 150, 
    required: [true, "Description required"]   
  },
  mainPepper: 
  { 
    type: String,
    minlength: 2, 
    maxlength: 100, 
    required: [true, "MainPepper required"]   
  },
  imageUrl: 
  { type: String, 
    required: [true, "Image required"]  
  },
  heat: 
  { 
    type: Number, 
    min: 1,
    max: 10, 
  },
  likes: 
  { 
    type: Number, 
    default: 0 
  },
  dislikes: 
  { 
    type: Number, 
    default: 0 
  },
  usersLiked: 
  { 
    type: [String]
  },
  usersDisliked: 
  { 
    type: [String] 
  },
});

sauceSchema.plugin(mongooseError);

// EXPORTATION______________________________________________
module.exports = mongoose.model("Sauce", sauceSchema);

