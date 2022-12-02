// IMPORTATION_________________________________________________________
const express = require("express");
const app = express();// création de l'application express

require("dotenv").config()// permet de cacher des informations
const helmet = require("helmet")// configurat° sécurisé par défault des headers
const cors = require('cors');// permet à user d'accéder à des ressources d'un autre serveur

const path = require('path');// outils pour travailler avec les chemins de fichiers
const mongoose = require("mongoose");// connexion entre mongoDB et node.js

// ROUTES_______________________________________________________________
const sauceRoutes = require("./routes/sauceRoute");
const userRoutes = require("./routes/userRoute");

// 
// CONNECTION A LA BD___________________________________________________
mongoose
  .connect(
    process.env.ACCESS_MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// 
// ATTRIBUTION MIDDLEWARE DE L'APPLICATION_______________________________
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cors());
app.use(express.json());// fonction middleware analyse les request JSON entrantes 

// 
// FONCTION MIDDLEWARE EXECUTEE AUX DEMANDES HTTP SUR LE CHEMIN "/..."___
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// 
// EXPORTATION___________________________________________________________
module.exports = app;// permet l'accès depuis les autres fichier du projet



