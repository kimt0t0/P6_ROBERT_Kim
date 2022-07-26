"use strict";

/* VARIABLES */
var bcrypt = require('bcrypt');

var User = require('../models/User');

var jwt = require('jsonwebtoken'); //token generation


var emailValidator = require('email-validator');

var passwordValidator = require('password-validator');

var MaskData = require('maskdata');

var passwordSchema = new passwordValidator();
passwordSchema.is().min(8) //min length
.is().max(50) //max length
.has().uppercase() //must have...
.has().lowercase().has().digits().has().not().symbols(); // must not have...

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
        email: maskedMail,
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
/* Log-in */


exports.login = function (req, res, next) {
  var maskedMail = MaskData.maskEmail2(req.body.email);
  User.findOne({
    email: maskedMail
  }) // check if the email address is in the data-base
  .then(function (user) {
    if (!user) {
      return res.status(401).json({
        error: 'Utilisateur non trouvé!'
      });
    }

    bcrypt.compare(req.body.password, user.password) //compares the hashes
    .then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          error: 'Mot de passe incorrect!'
        });
      }

      res.status(200).json({
        userId: user._id,
        token: jwt.sign({
          userId: user._id
        }, 'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h'
        })
      });
    })["catch"](function (error) {
      return res.status(500).json({
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
