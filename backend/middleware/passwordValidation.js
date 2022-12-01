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

// Réstrictions:
// minLength: 5,
// minLowercase: 1,
// minUppercase: 1,
// minNumbers: 1,
// minSymbols: 1,