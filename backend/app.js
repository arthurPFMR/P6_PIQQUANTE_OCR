
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require("mongoose");

const sauceRoutes = require("./routes/sauceRoute");
const userRoutes = require("./routes/userRoute");

// connection d'express à mongoDB:
// cacher ds gitignore?
const mongoPassword = "lenomdemonchien";
mongoose
  .connect(
    `mongodb+srv://albus:${mongoPassword}@clusterpiiquante.eq9kndp.mongodb.net/P6OCR?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors());
app.use(express.json());

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;


