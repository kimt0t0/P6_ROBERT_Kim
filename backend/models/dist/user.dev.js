"use strict";

/* *** MODÈLE *** */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=user.dev.js.map
