// IMPORTATION____________________________________________________________
const validator = require("validator");

// FONCTION DE VERIFICATION EMAIL POUR SIGNUP_____________________________
module.exports = (req, res, next) => {
    const {email} = req.body
    if(!validator.isEmail(email)) {
        res.status(400).json({ message: `email: ${email} isn't valid`})
    } else {
        next()
    }
}
