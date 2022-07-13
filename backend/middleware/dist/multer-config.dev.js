"use strict";

/* *** CONFIGURATION MULTER *** */
// package installé qui permettra d'enregistrer sur le serveur des images envoyées par les utilisateurs
var multer = require('multer');

var MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    // indique à multer où enregistrer les fichiers
    callback(null, 'images');
  },
  filename: function filename(req, file, callback) {
    // indique à multer d'utiliser le nom d'origine en remplaçant les ' ' par _
    var name = file.originalname.split(' ').join('_');
    var extension = MIME_TYPES[file.mimetype]; // utilise le dictionnaire de type MIME pour résoudre l'extension appropriée

    callback(null, name + Date.now() + '.' + extension); // et d'ajouter un timestamp
  }
});
module.exports = multer({
  storage: storage
}).single('image'); // exporte l'élément multer configuré en lui passant la constante storage, en indiquant qu'on gère les dl de fichiers image
//# sourceMappingURL=multer-config.dev.js.map
