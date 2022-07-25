/* VARIABLES */
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //token generation
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const MaskData = require('maskdata');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)  //min length
    .is.max(50) //max length
    .has().uppercase()  //must have...
    .has().lowercase()
    .has().digits()
    .has().not().symbols() // must not have...
    .has().not().spaces();

/* FONCTIONS */
/* Sign-Up */
exports.signup = (req, res, next) => {
    if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
        return res.status(400).json({message: 'Veuillez vérifier le format de votre adresse e-mail ainsi que votre mot-de-passe. Il doit comporter minimum 8 caractères et contenir des minuscules, majuscules et chiffres. Les espaces et caractères spéciaux ne sont pas autorisés.'})
    } 
    else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) {
        const maskedMail = MaskData.maskEmail2(req.body.email);
        bcrypt.hash(req.body.password, 10)
        .then (hash => {
            const user = new User ({
                email: maskedMail,
                password: hash
            });
            user.save()
            .then(hash => res.status(201).json({message: 'Utilisateur créé!'}))
            .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
    };
};

/* Log-in */
exports.login = (req, res, next) => {
    const maskedMail = MaskData.maskEmail2(req.body.email);
    User.findOne({email: maskedMail}) // check if the address is in the data-base
    .then(user => {
        if(!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé!'});
        }
        bcrypt.compare(req.body.password, user.password) //compares the hashes
        .then (valid => {
            if (!valid) {
                return res.status(401).json({error: 'Mot de passe incorrect!'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_SECRET_TOKEN'
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};