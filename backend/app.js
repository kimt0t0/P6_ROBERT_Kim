/* *** APPLICATION BACK *** */

/* VARIABLES */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const helmet = require('helmet');

const path = require('path');
const app = express();

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

require('dotenv').config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

/* CONNEXION MONGODB */
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

app.use(bodyParser.json());
//app.use(helmet());

app.use('./images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', saucesRoutes);
app.use('/api/sauce', userRoutes);

module.exports = app;