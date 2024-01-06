
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');

var serviceSchema = mongoose.Schema({
    category: {
        type: String,
        
    },
    image:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:String,
    },
    created: {
        type: Number,
        default: Date.now
    },
});

serviceSchema.plugin(uniqueValidator);
var serviceSchemaModel = mongoose.model('service', serviceSchema);

module.exports = {
    serviceSchemaModel,
}