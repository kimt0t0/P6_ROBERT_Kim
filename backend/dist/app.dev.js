"use strict";

var express = require('express');

var app = express();
app.uste(function (req, res) {
  res.json({
    message: 'Votre requête a bien été reçue !'
  });
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
