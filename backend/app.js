/* *** BACKEND APPLICATION *** */

/* VARIABLES */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const helmet = require('helmet');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

require('dotenv').config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS; 

/* CONNEXION TO MONGODB */
mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.omuvgnu.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* PREVENT CORS ERRORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


/* ACTIONS */
app.disable('x-powered-by'); //avoids/limits "finger-print" attacks against express apps using helmet
app.use(helmet());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname +  '//images'))); //static path for images
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;