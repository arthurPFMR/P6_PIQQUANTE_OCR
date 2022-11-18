const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config")

const sauceController = require("../controllers/sauceCtrl");

// route pour la création d'un objet__________________________________
router.post("/", auth, multer, sauceController.createSauce);

// route suppression objet____________________________________________
router.delete("/:id", auth, sauceController.deleteSauce);

// route modification objet___________________________________________
router.put("/:id", auth, multer, sauceController.modifySauce);

// route récupération d'objet unique__________________________________
router.get("/:id", auth, sauceController.getOneSauce);

// route récupération des objets______________________________________
router.get("/", auth, sauceController.getAllSauces);

module.exports = router;
