
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');



var itemSchema = mongoose.Schema({
    name: {
        type: String,
        min: 1
    },
   
    price: {
        type: String,
        min: 1
    },
    image: {
        type: String,
        
    },
    is_deleted:{
        type:Boolean,
        default:false,
    },
    created: {
        type: Number,
        default: Date.now
    },
});
itemSchema.plugin(uniqueValidator);
var itemSchemaModel = mongoose.model('item', itemSchema);

module.exports = {
    itemSchemaModel,
}