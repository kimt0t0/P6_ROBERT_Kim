/* *** MULTER CONFIG *** */
//multer package - saves images sent by users to server in backend repository 'images'

const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => { //indicates where the images should be saved
        callback(null, 'images');
    },
    filename: (req, file, callback) => { //use the original name but replace ' ' by '_'
        const name = file.originalname.split(' ').join('_').replace('.jpg', '');
        const extension = MIME_TYPES[file.mimetype]; //use type MIME dictionary to get the correct file extension
        callback(null, name + Date.now() + '.' + extension); //add a timestamp
    }
});

module.exports = multer({storage: storage}).single('image'); 
//export our multer element with the storage constant + specifies that it has to dl image files