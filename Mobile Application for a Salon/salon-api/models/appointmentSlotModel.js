
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');



var appointmentSlotSchema = mongoose.Schema({
    appointment_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'appointment'
    },

    time: {
        type: String,
    },

    reserved: {
        type: Boolean,
        default: false,
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
appointmentSlotSchema.plugin(uniqueValidator);
var appointmentSlotSchemaModel = mongoose.model('slot', appointmentSlotSchema);

module.exports = {
    appointmentSlotSchemaModel,
}