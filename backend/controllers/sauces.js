/* *** SAUCE CONTROLLER *** */

/* VARIABLES */
const Sauce = require('../models/Sauce');
const fs = require('fs');


/* FONCTIONS */

/* Get all sauces: */
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}))
};

/* Get one sauce: */
exports.getOneSauce = (req, res, next) => {
    findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
};


/* Create sauce: */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    //delete sauceObject._userId;
    const sauce = new Sauce ({
        ...sauceObject,
        //userId: req.auth.userId,
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });

    sauce.save()

    .then( () => {
        res.status(201).json({message: 'Sauce saved'})
    })
    .catch(error => res.status(400).json({error}))
};

/* Modify sauce: */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            }
            else {
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Object modified!'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
        .catch(error => res.status(400).json({error}))
};

/* Delete sauce: */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) // utilisation de l'idée pour accéder à la sauce dans la bdd
        .then(sauce => {
            if (sauce.userId != req.auth.userId) { // vérification si utilisateur <-> créateur
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = thing.imageUrl.split('/images/')[1]; // récupération nom fichier dans url image
                fs.unlink(`images/${filename}`, () => { //suppression du fichier et callback à exécuter ensuite
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => res.status(500).json({ error }))
 };