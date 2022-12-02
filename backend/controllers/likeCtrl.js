// IMPORTATION_______________________________________________________________________
const Sauce = require("../models/SauceModel");


// FONCTION LIKE/DISLIKE_____________________________________________________________
exports.usersLikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })// chercher dans la BD:
    .then((sauce) => {
      // AJOUT +1 LIKE________________________________________________________________
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        // MAJ Database
        Sauce.updateOne(
          { _id: req.params.id },
          {
            // opérateur mongoDB $inc incrémente un champ et une valeur(likes: 1):
            $inc: { likes: 1 },
            // opérateur mongoDB $push ajoute une valeur à un tableau(usersLiked: userId):
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Like added" }))
          .catch((error) => res.status(400).json({ error }));
      }
      // SUPPRIMER 1 LIKE______________________________________________________________
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        // MAJ Database
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            // opérateur mongoDB $pull supprime une valeur à un tableau(usersLiked: userId):
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Like deleted" }))
          .catch((error) => res.status(400).json({ error }));
      }
      // AJOUT 1 DISLIKE_______________________________________________________________
      if (!sauce.usersDisliked.includes(req.body.userId) &&req.body.like === -1) {
        // MAJ Database
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Dislike added" }))
          .catch((error) => res.status(400).json({ error }));
      }
      // SUPPRIMER 1 DISLIKE___________________________________________________________
      if (sauce.usersDisliked.includes(req.body.userId) &&req.body.like === 0) {
        // MAJ Database
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Dislike deleted" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
