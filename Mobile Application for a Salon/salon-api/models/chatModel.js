
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');

var chatSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    sendby_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    message: {
        type: String,
    },
    created: {
        type: Number,
        default: Date.now
    },
});

chatSchema.plugin(uniqueValidator);
var chatSchemaModel = mongoose.model('chat', chatSchema);

module.exports = {
    chatSchemaModel,
}