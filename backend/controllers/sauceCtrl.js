// IMPORTATION__________________________________________________________________
const Sauce = require("../models/SauceModel");
const fs = require("fs"); // permet d'intéragir avec les fichier du système

//
// STOCKAGE DE LA LOGIQUE METIER________________________________________________
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // transformation du corp de la requête (JSON=>JS)

  delete sauceObject._id; // suppression du champ _id (on utilisera celui générer par la BD)
  delete sauceObject._userId; // suppression du champ _userId afin d'utiliser celui du token (sécurité)

  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId, // créat° de l'ID via token du middleware d'auth
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // création de l'URL l'image: protocol=HTTP+Host=4200+Chemin=dossier images + nom du fichier
  });

  sauce
    .save()
    .then(() => res.status(201).json({ message: "Object created" })) // 201 = créat°
    .catch((error) => {
      res.status(400).json({ error }); // 400 = page introuvable, problème avec l'adresse
    });
};

exports.modifySauce = (req, res, next) => {
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(403).json({ message: "Unauthorized request" });
        } else {
          // on récupère le nom de la photo à supp:
          const filename = sauce.imageUrl.split("/images/")[1];
          // suppression image dans dossier image
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
  // Maj BD
  const sauceObject = req.file
    ? // si il y a un fichier:
      {
        ...JSON.parse(req.body.sauce), // récupère le body en parsant la chaîne de caractère
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, // création de l'Url de l'image
      }
    : // s'il n'y en a pas:
      { ...req.body }; // on récupère l'objet ds le body de la requête

  delete sauceObject._userId;

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Object modified" }))
    .catch((error) => res.status(401).json({ error })); // 401= user non authorized
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // récupérat° de l'objet dans la BD
    // vérifie si bon user:
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "Unauthorized request" }); // 403 = user n'a pas le droit d'accés
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })

            .then(() => {
              res.status(200).json({ message: "object deleted" });
            })
            .catch((error) => {
              res.status(401).json({ error }); // 401 = requête non effectuée,
            }); //                                manque info d'authentificat° valides
        });
      }
    })
    .catch((error) => res.status(500).json({ error })); // 500 = requête envoyée par le navigateur non traitée
}; //                                                pour une raison qui n'a pas pu être identifiée(pb server)

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error })); // 404= ressource indisponible
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
