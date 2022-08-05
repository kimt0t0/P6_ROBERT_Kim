/* *** CONFIGURATION MULTER *** */
// package installé qui permettra d'enregistrer sur le serveur des images envoyées par les utilisateurs

const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => { // indique à multer où enregistrer les fichiers
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // indique à multer d'utiliser le nom d'origine en remplaçant les ' ' par _
        const name = file.originalname.split(' ').join('_').replace('.jpg', '');
        const extension = MIME_TYPES[file.mimetype]; // utilise le dictionnaire de type MIME pour résoudre l'extension appropriée
        callback(null, name + Date.now() + '.' + extension); // et d'ajouter un timestamp
    }
});

module.exports = multer({storage: storage}).single('image'); // exporte l'élément multer configuré en lui passant la constante storage, en indiquant qu'on gère les dl de fichiers image