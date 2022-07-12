"use strict";

/* *** Application back *** */
var express = require('express');

var app = express();
app.use(function (req, res, next) {
  res.json({
    message: 'Votre requête a bien été reçue !'
  }); // instructions

  next();
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
