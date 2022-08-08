"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* *** SAUCE CONTROLLER *** */

/* VARIABLES */
var Sauce = require('../models/Sauce');

var fs = require('fs');

var PasswordValidator = require('password-validator');
/* FONCTIONS */

/* Create sauce: */


exports.createSauce = function (req, res, next) {
  var sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  var sauce = new Sauce(_objectSpread({}, sauceObject, {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }));
  sauce.save().then(function () {
    res.status(201).json({
      message: 'Sauce saved'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};
/* Modify sauce: */


exports.modifySauce = function (req, res, next) {
  var sauceObject = req.file ? _objectSpread({}, JSON.parse(req.body.sauce), {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }) : _objectSpread({}, req.body);
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
};
/* Delete sauce: */


exports.deleteSauce = function (req, res, next) {
  Sauce.findOne({
    _id: req.params.id
  }).then(function (sauce) {
    var filename = sauce.imageUrl.split('/images')[1]; //récupération adresse image

    fs.unlink("images/".concat(filename), function () {
      //suppression image du serveur
      Sauce.deleteOne({
        _id: req.params.id
      }).then(function () {
        return res.status(200).json({
          message: 'Sauce deleted!'
        });
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });
    });
  });
};
/* Get all sauces: */


exports.getAllSauces = function (req, res, next) {
  Sauce.find().then(function (sauces) {
    return res.status(200).json(sauces);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};
/* Get one sauce: */


exports.getOneSauce = function (req, res, next) {
  Sauce.findOne({
    _id: req.params.id
  }).then(function (sauce) {
    return res.status(200).json(sauce);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};
/* Like sauce: */


exports.likeSauce = function (req, res, next) {
  var like = req.body.like; //Add like:

  if (like === 1) {
    Sauce.updateOne({
      _id: req.params.id
    }, {
      $inc: {
        likes: 1
      },
      $push: {
        usersLiked: req.body.userId
      },
      _id: req.params.id
    }).then(res.status(200).json({
      message: 'Like added :-)'
    }))["catch"](res.status(400).json({
      error: error
    }));
  } //Add dislike:
  else if (like === -1) {
      Sauce.updateOne({
        _id: req.params.id
      }, {
        $inc: {
          dislikes: 1
        },
        $push: {
          usersDisliked: req.body.userId
        },
        _id: req.params.id
      }).then(res.status(200).json({
        message: 'Dislike added :-('
      }))["catch"](res.status(400).json({
        error: error
      }));
    } else {
      Sauce.findOne({
        _id: req.params.id
      }).then(function (sauce) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({
            _id: req.params.id
          }, {
            //_id considéré comme "undefined" fait planter le code
            $inc: {
              likes: -1
            },
            $pull: {
              usersLiked: req.body.userId
            },
            _id: req.params.id
          }).then(res.status(200).json({
            message: "You no longer like this sauce"
          }))["catch"](function (error) {
            return res.status(400).json({
              error: error
            });
          });
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({
            _id: req.params.id
          }, {
            $inc: {
              dislikes: -1
            },
            $pull: {
              usersDisliked: req.body.userId
            },
            _id: req.params.id
          }).then(res.status(200).json({
            message: "You no longer like this sauce"
          }))["catch"](function (error) {
            return res.status(400).json({
              error: error
            });
          });
        } else {
          console.log("There is a problem with this functionality");
        }
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });
    }
  /* 
  Si opinion === "liked"
  Sauce.updateOne({_id: req.params.id}, {
      $inc: {likes: -1},
      $pull: {usersLiked: req.body.userId}
      })
      .then(res.status(200).json({message: "You no longer like this sauce"}))
      .catch(error => res.status(400).json({error}));
    
  Si opinion === "disliked"
  Sauce.updateOne({_id: req.params.id}, {
      $inc: {dislikes: -1},
      $pull: {usersDisliked: req.body.userId}
      })
      .then(res.status(200).json({message: "You no longer like this sauce"}))
      .catch(error => res.status(400).json({error}));
  */

};
//# sourceMappingURL=sauces.dev.js.map
