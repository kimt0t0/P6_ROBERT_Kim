/* *** APPLICATION BACK *** */

/* VARIABLES */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

// ATTENTION ne fonctionne pas actuellement:
require('dotenv').config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS; 

/* CONNEXION MONGODB */
mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* PRÉVENTION ERREURS CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


/* ACTIONS */
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(bodyParser.json());

app.use('/images', express.static(__dirname +  'images')); //chemin statique pour les images
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;