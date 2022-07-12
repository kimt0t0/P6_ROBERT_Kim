"use strict";

/* *** ROUTER *** */

/* IMPORTS */
var express = require('express');

var user = require('../models/user');
/* VARIABLES */


var router = express.Router();
/* FONCTIONS */

/* Post création utilisateur */

router.post('/', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(function () {
    res.status(201).json({
      message: 'User saved successfully!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
});
/* Get vérification un utilisateur */

module.exports = router;
//# sourceMappingURL=stuff.dev.js.map
