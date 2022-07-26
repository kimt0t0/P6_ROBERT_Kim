/* *** MIDDLEWARE D'AUTHENTIFICATION *** */
//sert à vérifier que l'utilisateur est connecté et transmettre les infos de connexion lors des requêtes

/* VARIABLES */
const jwt = require('jsonwebtoken');

/* ACTIONS */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header de la requête
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décodage token
        const userId = decodedToken.userId; // récupération id utilisateur et ajout à l'objet Request pour que les routes puissent l'utiliser
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Identifiant utilisateur non valide!';
        }
        else {
            next();
        }
    }
    catch(error) {
        res.status(401).json({error: new Error('Requête invalide!')});
    }
};