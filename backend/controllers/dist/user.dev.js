"use strict";

/* VARIABLES */
var User = require('../models/User');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken'); //token generation


var emailValidator = require('email-validator');

var passwordValidator = require('password-validator');

var MaskData = require('maskdata');

var passwordSchema = new passwordValidator();
passwordSchema.is().min(8) //min length
.is.max(50) //max length
.has().uppercase() //must have...
.has().lowercase().has().digits().has().not().symbols() // must not have...
.has().not().spaces();
/* FONCTIONS */

/* Sign-Up */

exports.signup = function (req, res, next) {
  if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      message: 'Veuillez vérifier le format de votre adresse e-mail ainsi que votre mot-de-passe. Il doit comporter minimum 8 caractères et contenir des minuscules, majuscules et chiffres. Les espaces et caractères spéciaux ne sont pas autorisés.'
    });
  } else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) {
    var maskedMail = MaskData.maskEmail2(req.body.email);
    bcrypt.hash(req.body.password, 10).then(function (hash) {
      var user = new User({
        email: email,
        password: hash
      });
      user.save().then(function (hash) {
        return res.status(201).json({
          message: 'Utilisateur créé!'
        });
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });
    })["catch"](function (error) {
      return res.status(500).json({
        error: error
      });
    });
  }

  ;
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
