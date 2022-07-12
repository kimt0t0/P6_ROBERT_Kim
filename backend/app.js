const express = require('express');

const app = express();

app.uste((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;