"use strict";

/* *** APPLICATION BACK *** */

/* VARIABLES */
var express = require('express');

var path = require('path');

var mongoose = require('mongoose');

var userRoutes = require('./routes/user');

var saucesRoutes = require('./routes/sauce');

var User = require('./models/User');

var Sauce = require('./models/Sauce');

var app = express();
/* ENREGISTREMENT DES ROUTEURS */

app.use('/api/user', userRoutes);
app.use('/api/sauce', saucesRoutes);
/* CONNEXION MONGODB */

require('dotenv').config();

var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
mongoose.connect("mongodb+srv://kimt0t0:BdmNH6SUZFIkVT0u@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
});
/* MIDDLEWARES */
// Prévention erreurs CORS:

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); //Confirmation requête de l'app au serveur:

app.use(function (req, res, next) {
  res.json({
    message: 'Votre requête a bien été reçue !'
  }); // instructions

  next();
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
