"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { bannerSchemaModel } = require('../models/bannerModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

module.exports = {
    createBanner: async (req, res) => {
        

        const banner = bannerSchemaModel({
            image:req.file.filename
        });

        banner.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [banner]
                });
            }
        });
    },

    getBanners: async (req, res) => {
        const user = await bannerSchemaModel.find().sort({ created: -1 });
        if (!user) {
            res.status(500).json({ error: true, data: "no items found !" });
        } else {
            res.status(200).json({ error: false, data: user });
        }

    },
};


