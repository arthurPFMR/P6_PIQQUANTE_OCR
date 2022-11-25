// IMPORTATION________________________________________________________________________
const express = require("express");
const router = express.Router();

const emailValidation = require("../middleware/emailValidation")
const passwordValidation = require("../middleware/passwordValidation")
const userController = require("../controllers/userCtrl");

// ROUTES_____________________________________________________________________________
router.post("/signup", emailValidation, passwordValidation, userController.signup);
router.post("/login", userController.login);

// EXPORT_____________________________________________________________________________
module.exports = router;
