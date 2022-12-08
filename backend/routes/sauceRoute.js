// IMPORTATION_______________________________________________________
const express = require("express");
const auth = require("../middleware/auth");
require("dotenv").config();
const router = express.Router();

const multer = require("../middleware/multer-config");
const sauceController = require("../controllers/sauceCtrl");
const like = require("../controllers/likeCtrl")


// Create-Read-Update-Delete (CRUD)___________________________________

router.post("/", auth, multer, sauceController.createSauce);

router.get("/", auth, sauceController.getAllSauces);

router.get("/:id", auth, sauceController.getOneSauce);

router.put("/:id", auth, multer, sauceController.modifySauce);

router.delete("/:id", auth, sauceController.deleteSauce);

router.post("/:id/like", auth, like.usersLikeSauce);

// EXPORTATION________________________________________________________
module.exports = router;
