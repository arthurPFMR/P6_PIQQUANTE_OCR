// sssssssssssssssssssssssssss
const express = require("express");
require("dotenv").config()
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require("mongoose");


const sauceRoutes = require("./routes/sauceRoute");
const userRoutes = require("./routes/userRoute");

mongoose
  .connect(
    process.env.ACCESS_MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors());
app.use(express.json());

app.get('/', function(req, res, next)  {
  console.log(process.env.TEST_DOT_ENV)
})
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;


