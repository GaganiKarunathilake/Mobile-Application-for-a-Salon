
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');

var bannerSchema = mongoose.Schema({
    image: {
        type: String,
        
    },
    created: {
        type: Number,
        default: Date.now
    },
});

bannerSchema.plugin(uniqueValidator);
var bannerSchemaModel = mongoose.model('banner', bannerSchema);

module.exports = {
    bannerSchemaModel,
}