/* *** SAUCE CONTROLLER *** */

/* VARIABLES */
const Sauce = require('../models/Sauce');
const fs = require('fs');
const PasswordValidator = require('password-validator');


/* FONCTIONS */

/* Create sauce: */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    delete sauceObject._id;
    delete sauceObject._userId;
    
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });

    sauce.save()

    .then( () => {
        res.status(201).json({message: 'Sauce saved'})
    })
    .catch(error => res.status(400).json({error}));
};

/* Modify sauce: */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : {...req.body};

    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Object modified!'}))
    .catch(error => res.status(401).json({error}));
};

/* Delete sauce: */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images')[1]; //récupération adresse image
        fs.unlink(`images/${filename}`, () => { //suppression image du serveur
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce deleted!'}))
        .catch(error => res.status(400).json({error}))
    });
    });
 };

/* Get all sauces: */
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};

/* Get one sauce: */
exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
};

 /* Like sauce: */
exports.likeSauce = (req, res, next) => {
    const like = req.body.like;
    const dislike = req.body.dislike;
    console.log("like: ", like);
    console.log("dislike: ", dislike);

    if (like === 1) {
        Sauce.updateOne({_id: req.params.id}, {
            $inc: {likes: 1},
            $push: {usersLiked: req.body.userId},
            _id: req.params.id
        })
        .then(res.status(200).json({message: 'Like added :-)'}))
        .catch(res.status(400).json({error}));
    }
    else if (like === -1) {
        Sauce.updateOne({_id: req.params.id}, {
            $inc: {dislikes: 1},
            $push: {usersDisliked: req.body.userId},
            _id: req.params.id
        })
        .then(res.status(200).json({message: 'Dislike added :-('}))
        .catch(res.status(400).json({error}));
    }
};