"use strict";

/* *** APPLICATION BACK *** */

/* VARIABLES */
var express = require('express');

var mongoose = require('mongoose');

var path = require('path');

var userRoutes = require('./routes/user');

var User = require('./models/User');

var app = express();
/* ENREGISTREMENT DU ROUTEUR */

app.use('/api/user', userRoutes);
/* CONNEXION MONGODB */

mongoose.connect('mongodb+srv://kimt0t0:<BdmNH6SUZFIkVT0u>@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
});
/* MIDDLEWARES */
// Express reçoit les requêtes avec un Content-Type 'application/json' et les met à disposition sur l'objet req:

app.use(express.json()); // Prévention erreurs CORS:

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.post('/api/user', function (req, res, next) {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
}); //Confirmation requête de l'app au serveur:

app.use(function (req, res, next) {
  res.json({
    message: 'Votre requête a bien été reçue !'
  }); // instructions

  next();
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
