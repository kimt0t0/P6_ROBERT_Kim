"use strict";

/* *** MIDDLEWARE D'AUTHENTIFICATION *** */
//sert à vérifier que l'utilisateur est connecté et transmettre les infos de connexion lors des requêtes

/* VARIABLES */
var jwt = require('jsonwebtoken');
/* ACTIONS */


module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1]; // on récupère le token de la requête entrante

    var decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // on le vérifie

    var userId = decodedToken.userId; // on récupère l'id du token

    if (req.body.userId && req.body.userId !== userId) {
      // on compare le userid de la requête à celui du token
      throw 'User id non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request !')
    });
  }
};
//# sourceMappingURL=auth.dev.js.map
