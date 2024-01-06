
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');



var appointmentDateSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    specialist_name: {
        type: String,
        required: true,
    },
    appointmentdate: {
        type: String,
    },
    appointmenttime: {
        type: String,
    },
    category: {
        type: String
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