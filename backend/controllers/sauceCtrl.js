const Sauce = require("../models/SauceModel");
const fs = require("fs");

// STOCKAGE DE LA LOGIQUE METIER:
// création objet________________________________________________________________
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const Sauce = new Sauce({
    ...sauceObject,
    _userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce ajouté !" }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// modification objet____________________________________________________________
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...json.parse(req.body.sauce),
        imageUrl: `
        ${req.protocol}://${req.get("host")}/images/${req.file.filename}
        `,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// suppression objet_____________________________________________________________
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        const filename = sauce.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "objet supprimé !" });
            })
            .catch((error) => {
              res.status(401).json({ error });
            });
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// récupération un objet uniquement_______________________________________________
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// récupération de tout les objets________________________________________________
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces + console.log("ohé")))
    .catch((error) => res.status(400).json({ error }));
};
