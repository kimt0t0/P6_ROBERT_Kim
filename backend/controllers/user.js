/* VARIABLES */
const User = require('../models/user');

/* FONCTIONS */
/* Inscription */
exports.signup = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(
        () => {
            res.status(201).json({
                message: 'User created successfully!'
            });
        }
    ).catch(
        (error) => {
            res.tatus(400).json({
                error: error
            });
        }
    );
};

/* Connexion */
exports.login = (req, res, next) => {
    // instructions
}