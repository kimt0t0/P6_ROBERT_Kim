"use strict";

/* *** MIDDLEWARE D'AUTHENTIFICATION *** */
//sert à vérifier que l'utilisateur est connecté et transmettre les infos de connexion lors des requêtes

/* VARIABLES */
var jwt = require('jsonwebtoken');
/* ACTIONS */


module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header de la requête

    var decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décodage token

    var userId = decodedToken.userId; // récupération id utilisateur et ajout à l'objet Request pour que les routes puissent l'utiliser

    req.auth = {
      userId: userId
    };
    next();
  } catch (error) {
    res.status(401).json({
      error: error
    });
  }
};
//# sourceMappingURL=auth.dev.js.map
