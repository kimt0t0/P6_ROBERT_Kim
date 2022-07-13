"use strict";

/* *** ROUTEUR SAUCES *** */

/* VARIABLES */
var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth');

var sauceCtrl = require('../controllers/sauce');
/* ACTIONS */


router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router["delete"]('/:id', auth, sauceCtrl.deleteSauce);
module.exports = router;
//# sourceMappingURL=sauce.dev.js.map
