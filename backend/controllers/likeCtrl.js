const Sauce = require("../models/SauceModel");

exports.usersLikeSauce = (req, res, next) => {
  // chercher dans databas:
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // AJOUT +1 LIKE________________________________________________________________
      // si usersLiked false et likes === 1:
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
          .then(() => res.status(201).json({ message: "+ 1 like !" }))
          .catch((error) => res.status(400).json({ error }));
      }
      // SUPPRIMER 1 LIKE______________________________________________________________
      // si usersLiked false et likes === 0:
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
          .then(() => res.status(201).json({ message: "like à 0 !" }))
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
          .then(() => res.status(201).json({ message: "+ 1 dislike !" }))
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
          .then(() => res.status(201).json({ message: "- 1 dislike !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
