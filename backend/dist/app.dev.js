"use strict";

/* *** APPLICATION BACK *** */

/* VARIABLES */
var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var path = require('path');

var userRoutes = require('./routes/user');

var saucesRoutes = require('./routes/sauce'); //const helmet = require('helmet');


var app = express();

require('dotenv').config();

var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
/* CONNEXION MONGODB */

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
});
app.use(bodyParser.json()); //app.use(helmet());

app.use('./images', express["static"](path.join(__dirname, 'images')));
app.use('/api/user', saucesRoutes);
app.use('/api/sauce', userRoutes);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
