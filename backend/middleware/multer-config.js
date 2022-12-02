// IMPORTATION________________________________________________
const multer = require("multer")

// CREATION DU MIME_TYPES_____________________________________
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
}

// FONCTION STORAGE___________________________________________
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, "images")
},// multer enregistre les fichiers dans le diskSorage dossier images

    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");// indique à multer d'utiliser le nom d'origine
        const extension = MIME_TYPES[file.mimetype];// donne les extension de fichier appropriée
        callback(null, name + Date.now() + "." + extension)// nomination final du fichier pour la BD
}
})

module.exports = multer({ storage }).single("image");// exporte multer configuré avec la constante storage
                                                    // télécharge uniquement les fichiers image