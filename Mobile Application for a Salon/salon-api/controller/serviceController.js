"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { serviceSchemaModel } = require('../models/serviceModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

module.exports = {
    createService: async (req, res) => {
        const { category, title, description, price } = req.body;


        const service = serviceSchemaModel({
            category: category,
            image: req.file.filename,
            title: title,
            description: description,
            price: price
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

    getServices: async (req, res) => {
        const service = await serviceSchemaModel.find({ category: req.body.category }).sort({ created: -1 });
        if (!service) {
            res.status(500).json({ error: true, data: "no items found !" });
        } else {
            res.status(200).json({ error: false, data: service });
        }

    },
};


