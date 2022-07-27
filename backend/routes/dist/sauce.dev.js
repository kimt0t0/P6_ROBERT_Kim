"use strict";

/* *** ROUTEUR SAUCES *** */

/* VARIABLES */
var sauceCtrl = require('../controllers/sauces');

var auth = require('../middleware/auth');

var express = require('express');

var router = express.Router();

var multer = require('../middleware/multer-config');
/* ACTIONS */
//router.get('/', auth, sauceCtrl, getAllSauces)


router.post('/', auth, multer, sauceCtrl.createSauce); // garder multer après auth sinon les images et requêtes non authentifiées passent

router.put('/:id', auth, multer, sauceCtrl.modifySauce); // idem

router["delete"]('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.createLike);
module.exports = router;
//# sourceMappingURL=sauce.dev.js.map
