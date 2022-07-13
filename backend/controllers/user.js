/* VARIABLES */
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* FONCTIONS */
/* Inscription */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // async func de cryptage mot de passe (avec hachage x10)
        .then(hash => { // création utilisateur
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save() // enregistrement utilisateur sur bdd
                .then(() => {
                    res.status(201).json({
                        message: 'Utilisateur créé !'
                    })
                })
                .catch(error => {
                    res.status(400).json({error})
                });
        })
        .catch(error => {
            res.status(500).json({error})
        });
};

/* Connexion */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Paire login/mot de passe incorrecte'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            message: 'Paire login/mot de passe incorrecte'
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // chiffrage nouveau token qui contient:
                            {userId: user._id}, // id utilisateur
                            'RANDOM_TOKEN_SECRET', // chaîne secrète de dev temporaire pour crypter le token
                            {expiresIn: '24h'} // durée de validité
                        )
                    });
                })
                .catch(error => {
                    res.status(500).json({error})
                });
        })
        .catch(error => res.status(500).json({error}));
};