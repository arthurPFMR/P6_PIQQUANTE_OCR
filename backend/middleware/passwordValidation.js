// IMPORTATION_____________________________________________________________
const validator = require("validator");

// FONCTION VERIFICATION MDP POUR SIGNUP___________________________________
module.exports = (req, res, next) => {
    const {password} = req.body
    if(!validator.isStrongPassword(password)) {
        res.status(400).json({ message: "password not secure enough" })
    } else {
        next()
    }
}


// chemin pour les restrictions de la création de mot de passe:
// const { default: isStrongPassword } = require("validator/lib/isStrongPassword");

// Réstrictions:
// minLength: 5,
// minLowercase: 1,
// minUppercase: 1,
// minNumbers: 1,
// minSymbols: 1,