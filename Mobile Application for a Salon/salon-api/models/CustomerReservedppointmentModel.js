
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');



var customerReservedAppointmentSchema = mongoose.Schema({
    appointment_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'appointment'
    },
    slot_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'slot'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    created: {
        type: Number,
        default: Date.now
    },

});
customerReservedAppointmentSchema.plugin(uniqueValidator);
var customerReservedAppointmentSchemaModel = mongoose.model('customerappointment', customerReservedAppointmentSchema);

module.exports = {
    customerReservedAppointmentSchemaModel,
}