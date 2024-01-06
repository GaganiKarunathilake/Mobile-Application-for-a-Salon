"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { chatSchemaModel } = require('../models/chatModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

module.exports = {
    createChat: async (req, res) => {
        const { user_id, sendby_id, message } = req.body;


        const service = chatSchemaModel({
            user_id: user_id,
            sendby_id: sendby_id,
            message: message,
        });

        service.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [service]
                });
            }
        });
    },

    getChat: async (req, res) => {
        // const service = await chatSchemaModel.find({ user_id: req.body.user_id});

        // if (!service) {
        //     res.status(500).json({ error: true, data: "no chat found !" });
        // } else {
        //     res.status(200).json({ error: false, data: service });
        // }
        const service = await chatSchemaModel.find({
            $or: [
                { user_id: req.body.user_id },
                { sendby_id: req.body.user_id }
            ]
        });
        if (!service || service.length === 0) {
            res.status(200).json({ error: true, data: [] });
        } else {
            res.status(200).json({ error: false, data: service });
        }
    },
};


