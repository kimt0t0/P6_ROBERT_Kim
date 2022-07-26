"use strict";

/* *** APPLICATION BACK *** */

/* VARIABLES */
var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var helmet = require('helmet');

var path = require('path');

var app = express();

var cors = require('cors');

var userRoutes = require('./routes/user');

var saucesRoutes = require('./routes/sauce'); // ATTENTION ne fonctionne pas actuellement:


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
/* MIDDLEWARES */
// Prévention erreurs CORS:

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(bodyParser.json());
app.use(helmet());
app.use('./images', express["static"](path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/sauce', saucesRoutes);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
