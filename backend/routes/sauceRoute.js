const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sauceController = require("../controllers/sauceCtrl");
const like = require("../controllers/likeCtrl")

// CRUD:
// route récupération des objets______________________________________
router.get("/", auth, sauceController.getAllSauces);

// route récupération d'objet unique__________________________________
router.get("/:id", auth, sauceController.getOneSauce);

// route pour la création d'un objet__________________________________
router.post("/", auth, multer, sauceController.createSauce);

// route modification objet___________________________________________
router.put("/:id", auth, multer, sauceController.modifySauce);

// route suppression objet____________________________________________
router.delete("/:id", auth, sauceController.deleteSauce);

// route like/dislike__________________________________________________
router.post("/:id/like", auth, like.usersLikeSauce);

module.exports = router;
