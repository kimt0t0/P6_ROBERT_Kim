/* *** APPLICATION BACK *** */

/* VARIABLES */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const User = require('./models/User');

const app = express();

/* ENREGISTREMENT DU ROUTEUR */
app.use('/api/user', userRoutes);

/* CONNEXION MONGODB */
mongoose.connect('mongodb+srv://kimt0t0:<BdmNH6SUZFIkVT0u>@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* MIDDLEWARES */
// Express reçoit les requêtes avec un Content-Type 'application/json' et les met à disposition sur l'objet req:
app.use(express.json());

// Prévention erreurs CORS:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/user', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});

//Confirmation requête de l'app au serveur:
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    // instructions
    next();
});

module.exports = app;