"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { appointmentDateSchemaModel } = require('../models/appointmentDateModel');
const { appointmentSlotSchemaModel } = require('../models/appointmentSlotModel');
const { customerReservedAppointmentSchemaModel } = require('../models/CustomerReservedppointmentModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');



module.exports = {
    createAppointDate: async (req, res) => {
        const { specialist_name, date } = req.body;

        const appointment = appointmentDateSchemaModel({
            specialist_name: specialist_name,
            date: date,
        });

        appointment.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [appointment]
                });
            }
        });
    },

    createAppointSlot: async (req, res) => {
        const { appointment_id, time } = req.body;

        const appointment = appointmentSlotSchemaModel({
            appointment_id: appointment_id,
            time: time,
        });

        appointment.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err,
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [appointment]
                });
            }
        });
    },


    getAppDates: async (req, res) => {
        const dates = await appointmentDateSchemaModel.find({ is_deleted: false });
        res.status(200).json({
            error: false,
            data: dates
        });
    },

    getAppSlots: async (req, res) => {
        const { appointment_id } = req.body;

        const dates = await appointmentSlotSchemaModel.find({ appointment_id: appointment_id });
        res.status(200).json({
            error: false,
            data: dates
        });
    },

    getAllAppSlots: async (req, res) => {

        const dates = await appointmentSlotSchemaModel.find({ is_deleted: false }).populate('appointment_id').exec();
        res.status(200).json({
            error: false,
            data: dates
        });
    },

    createCustomerAppointment: async (req, res) => {
        const { appointment_id, slot_id, user_id } = req.body;

        const appointment = customerReservedAppointmentSchemaModel({
            appointment_id: appointment_id,
            slot_id: slot_id,
            user_id, user_id
        });

        appointment.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err,
                });
            } else {
                appointmentSlotSchemaModel.updateOne({ _id: slot_id }, {
                    $set: {
                        reserved: true
                    }
                }, (err, response) => {
                    if (err) {
                        res.status(200).json({
                            error: true,
                            data: err
                        });
                    } else {
                        res.status(200).json({
                            error: false,
                            data: [appointment]
                        });
                    }
                });
            }
        });
    },

    getAllCustomerAppointments: async (req, res) => {
        const dates = await customerReservedAppointmentSchemaModel.find().populate('slot_id').populate('appointment_id').populate('user_id')
            .exec();
        res.status(200).json({
            error: false,
            data: dates
        });
    },

    getCustomerAppointments: async (req, res) => {
        const { user_id } = req.body;

        const dates = await customerReservedAppointmentSchemaModel.find({ user_id: user_id }).populate('slot_id').populate('appointment_id').populate('user_id')
            .exec();
        res.status(200).json({
            error: false,
            data: dates
        });
    },



    deleteSlot: async (req, res) => {
        const { slot_id, is_deleted } = req.body;

        appointmentSlotSchemaModel.updateOne({ _id: slot_id }, {
            $set: {
                is_deleted: is_deleted
            }
        }, (err, response) => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err
                });
            } else {
                res.status(200).json({
                    error: false
                });
            }
        });
    },


    deleteAppointment: async (req, res) => {
        const { appointment_id, is_deleted } = req.body;

        appointmentDateSchemaModel.updateOne({ _id: appointment_id }, {
            $set: {
                is_deleted: is_deleted
            }
        }, (err, response) => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err
                });
            } else {
                res.status(200).json({
                    error: false
                });
            }
        });
    },
};


