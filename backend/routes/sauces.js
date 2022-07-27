/* *** ROUTEUR SAUCES *** */

/* VARIABLES */
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');


/* ACTIONS */
//Create / edit / suppress sauce:
router.post('/', auth, multer, sauceCtrl.createSauce); // garder multer après auth sinon les images et requêtes non authentifiées passent
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // idem
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Get sauce(s):
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

//Likes:
router.post('/:id/like', auth, sauceCtrl.createLike);

module.exports = router;