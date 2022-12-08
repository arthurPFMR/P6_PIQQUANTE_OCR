// IMPORTATION______________________________________________________
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET
// FONCTION D'AUTHORISATION USER____________________________________
module.exports = (req, res, next) => {
  try {
    // récupère le token du header authorization de la requête entrante:
    const token = req.headers.authorization.split(" ")[1];// .split permet de récupérer le token dans le header
    const decodeToken = jwt.verify(token, secret);
    // vérifie si le token est valide
    const userId = decodeToken.userId;// on récupère l'ID user du token
    // ajout de l'ID user du token à la requête pour l'exploiter dans les routes (auth):
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};



