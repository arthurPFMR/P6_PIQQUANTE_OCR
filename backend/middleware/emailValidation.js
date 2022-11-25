const validator = require("validator");

module.exports = (req, res, next) => {
    const {email} = req.body
    if(!validator.isEmail(email)) {
        res.status(400).json({ message: `l'email: ${email} n'est pas valide !`})
    } else {
        next()
    }
}

// const { default: isEmail } = require("validator/lib/isEmail");