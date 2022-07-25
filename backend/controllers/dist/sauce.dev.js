"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* *** SAUCE CONTROLLER *** */

/* VARIABLES */
var Sauce = require('../models/Sauce');

var fs = require('fs');
/* FONCTIONS */

/* Create sauce: */


exports.createSauce = function (req, res, next) {
  var sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  var sauce = new Sauce(_objectSpread({}, sauceObject, {
    userId: req.auth.userId,
    imageURL: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }));
  sauce.save().then(function () {
    res.status(201).json({
      message: 'Sauce saved'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
  console.log(sauce);
};
/* Modify sauce: */


exports.modifySauce = function (req, res, next) {
  var sauceObject = req.file ? _objectSpread({}, JSON.parse(req.body.thing), {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }) : _objectSpread({}, req.body);
  delete sauceObject._userId;
  Sauce.findOne({
    _id: req.params.id
  }).then(function (sauce) {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({
        message: 'Not authorized'
      });
    } else {
      Sauce.updateOne({
        _id: req.params.id
      }, _objectSpread({}, sauceObject, {
        _id: req.params.id
      })).then(function () {
        return res.status(200).json({
          message: 'Object modified!'
        });
      })["catch"](function (error) {
        return res.status(401).json({
          error: error
        });
      });
    }
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};
/* Delete sauce: */


exports.deleteSauce = function (req, res, next) {
  Sauce.findOne({
    _id: req.params.id
  }) // utilisation de l'idée pour accéder à la sauce dans la bdd
  .then(function (sauce) {
    if (sauce.userId != req.auth.userId) {
      // vérification si utilisateur <-> créateur
      res.status(401).json({
        message: 'Not authorized'
      });
    } else {
      var filename = thing.imageUrl.split('/images/')[1]; // récupération nom fichier dans url image

      fs.unlink("images/".concat(filename), function () {
        //suppression du fichier et callback à exécuter ensuite
        Sauce.deleteOne({
          _id: req.params.id
        }).then(function () {
          res.status(200).json({
            message: 'Objet supprimé !'
          });
        })["catch"](function (error) {
          return res.status(401).json({
            error: error
          });
        });
      });
    }
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
};
//# sourceMappingURL=sauce.dev.js.map
