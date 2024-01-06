
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');



var appointmentDateSchema = mongoose.Schema({
    specialist_name: {
        type: String,
        required: true,
    },

    date:{
        type:String,
    },

    is_deleted: {
        type: Boolean,
        default: false,
    },
    
    created: {
        type: Number,
        default: Date.now
    },

});
appointmentDateSchema.plugin(uniqueValidator);
var appointmentDateSchemaModel = mongoose.model('appointment', appointmentDateSchema);

module.exports = {
    appointmentDateSchemaModel,
}