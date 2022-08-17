/* *** SAUCE MODEL *** */

const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String},
    heat: {type: Number},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    userId: {type: String},
    usersLiked: { type: [String], req: true, default: [] },
    usersDisliked: { type: [String], req: true, default: [] },
});

module.exports = mongoose.model('Sauce', sauceSchema);