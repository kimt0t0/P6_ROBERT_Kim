"use strict";

/* *** APPLICATION BACK *** */

/* VARIABLES */
var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var helmet = require('helmet');

var cors = require('cors');

var userRoutes = require('./routes/user');

var saucesRoutes = require('./routes/sauces');

var app = express(); // ATTENTION ne fonctionne pas actuellement:

require('dotenv').config();

var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
/* CONNEXION MONGODB */

mongoose.connect("mongodb+srv://".concat(user, ":").concat(pass, "@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
});
/* PRÉVENTION ERREURS CORS */

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
/* ACTIONS */

app.use(helmet({
  crossOriginResourcePolicy: {
    policy: "cross-origin"
  }
}));
app.use(bodyParser.json());
app.use('/images', express["static"](__dirname + 'images')); //chemin statique pour les images

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
