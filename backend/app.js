/* *** APPLICATION BACK *** */

/* VARIABLES */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');
const User = require('./models/User');
const Sauce = require('./models/Sauce');

const app = express();

/* ENREGISTREMENT DES ROUTEURS */
app.use('/api/user', userRoutes);
app.use('/api/sauce', saucesRoutes);

/* CONNEXION MONGODB */
require('dotenv').config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://kimt0t0:BdmNH6SUZFIkVT0u@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/* MIDDLEWARES */

// Prévention erreurs CORS:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Confirmation requête de l'app au serveur:
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    // instructions
    next();
});

module.exports = app;