"use strict";

/* *** ROUTEUR SAUCES *** */

/* VARIABLES */
var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth');

var multer = require('../middleware/multer-config');

var sauceCtrl = require('../controllers/sauce');
/* ACTIONS */


router.get('/', auth, sauceCtrl, getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce); // garder multer après auth sinon les images et requêtes non authentifiées passent

router.put('/:id', auth, multer, sauceCtrl.modifySauce); // idem

router.get('/:id', auth, sauceCtrl, getOneThing);
router["delete"]('/:id', auth, sauceCtrl.deleteSauce);
module.exports = router;
//# sourceMappingURL=sauce.dev.js.map
