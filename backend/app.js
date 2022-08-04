/* *** APPLICATION BACK *** */

/* VARIABLES */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const helmet = require('helmet');

const path = require('path');
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
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


/* ACTIONS */
app.use(bodyParser.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;