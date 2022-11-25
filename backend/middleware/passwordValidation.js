const validator = require("validator");


module.exports = (req, res, next) => {
    const {password} = req.body
    if(!validator.isStrongPassword(password)) {
        res.status(400).json({ message: "le mot de passe n'est pas assez sécurisé !" })
    } else {
        next()
    }
}



// const { default: isStrongPassword } = require("validator/lib/isStrongPassword");
// minLength: 5,
// minLowercase: 1,
// minUppercase: 1,
// minNumbers: 1,
// minSymbols: 1,