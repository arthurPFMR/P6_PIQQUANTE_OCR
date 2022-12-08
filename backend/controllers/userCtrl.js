// IMPORTATION_____________________________________________________________
const bcrypt = require("bcrypt");// hash le password ds la BD
const jwt = require("jsonwebtoken");// creat° de token
require("dotenv").config();

const User = require("../models/UserModel");

const secret = process.env.SECRET

// FONCTIONS SIGNUP________________________________________________________
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)// fonction de hachage de bcrypt ("saler" 10x)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user// envoie user dans la BD
        .save()
        .then(() => res.status(201).json({ message: "User created" }))
        .catch((error) => res.status(500).json({ error }));// 500 = requête envoyée par le navigateur non traitée
    })//                                                pour une raison qui n'a pas pu être identifiée(pb server)
    .catch((error) => res.status(400).json({ error }));
};

// FONCTIONS LOGIN_________________________________________________________
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Unauthorized !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)// compare le mot de passe entré par l'user 
          .then((valid) => {                       // avec le hash enregistré dans la database
            if (!valid) {
              res.status(401).json({ message: "Unauthorized !" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id }, 
                  secret, 
                  {expiresIn: "3h"}
                  ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
