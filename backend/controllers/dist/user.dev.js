"use strict";

/* VARIABLES */
var User = require('../models/User');

var jwt = require('jsonwebtoken');
/* FONCTIONS */

/* Inscription */


exports.signup = function (req, res, next) {
  bcrypt.hash(req.body.password, 10) // async func de cryptage mot de passe (avec hachage x10)
  .then(function (hash) {
    // création utilisateur
    var user = new User({
      email: req.body.email,
      password: hash
    });
    user.save() // enregistrement utilisateur sur bdd
    .then(function () {
      res.status(201).json({
        message: 'Utilisateur créé !'
      });
    })["catch"](function (error) {
      res.status(400).json({
        error: error
      });
    });
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
};
/* Connexion */


exports.login = function (req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        message: 'Paire login/mot de passe incorrecte'
      });
    }

    bcrypt.compare(req.body.password, user.password).then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          message: 'Paire login/mot de passe incorrecte'
        });
      }

      res.status(200).json({
        userId: user._id,
        token: jwt.sign( // chiffrage nouveau token qui contient:
        {
          userId: user._id
        }, // id utilisateur
        'RANDOM_TOKEN_SECRET', // chaîne secrète de dev temporaire pour crypter le token
        {
          expiresIn: '24h'
        } // durée de validité
        )
      });
    })["catch"](function (error) {
      res.status(500).json({
        error: error
      });
    });
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};
//# sourceMappingURL=user.dev.js.map
