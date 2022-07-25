/* *** ROUTEUR SAUCES *** */

/* VARIABLES */
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

/* ACTIONS */
router.get('/', auth, sauceCtrl, getAllSauces)
router.post('/', auth, multer, sauceCtrl.createSauce); // garder multer après auth sinon les images et requêtes non authentifiées passent
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // idem
router.get('/:id', auth, sauceCtrl, getOneThing);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;