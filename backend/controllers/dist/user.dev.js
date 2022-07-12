"use strict";

/* VARIABLES */
var User = require('../models/user');
/* FONCTIONS */

/* Inscription */


exports.signup = function (req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(function () {
    res.status(201).json({
      message: 'User created successfully!'
    });
  })["catch"](function (error) {
    res.tatus(400).json({
      error: error
    });
  });
};
/* Connexion */


exports.login = function (req, res, next) {// instructions
};
//# sourceMappingURL=user.dev.js.map
