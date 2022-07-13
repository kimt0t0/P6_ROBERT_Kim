"use strict";

/* *** ROUTES USER *** */

/* VARIABLES */
var express = require('express');

var router = express.Router();

var userCtrl = require('../controllers/user');
/* ACTIONS */


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
module.exports = router;
//# sourceMappingURL=user.dev.js.map
