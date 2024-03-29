"use strict";

const Joi = require('joi');
const passwordHash = require("password-hash");
const { userSchemaModel } = require('../models/userModel');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');


module.exports = {

    createUser: async (req, res) => {
        const { name, email, adl1, adl2, password, city, usertype } = req.body;

        const user = await userSchemaModel.findOne({
            email: email,
        });

        if (user) return res.send({
            error: true,
            data: {}
        });
        const userModel = userSchemaModel({
            usertype: usertype,
            name: name,
            email: email,
            adl1: adl1,
            adl2: adl2,
            city: city,
            password: passwordHash.generate(password),
        });

        const token = jwt.sign({
            _id: userModel._id,
            firstname: userModel.firstname,
            lastname: userModel.lastname,
            email: userModel.email,
            phone: userModel.phone

        }, process.env.TOKEN_SECRET);

        userModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err,
                    chatId: []
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: userModel,
                    loginstatus: 'olduser',
                    token: token
                });
            }
        });
    },
    //


    loginUser: async (req, res) => {
        const { email, password } = req.body;

        console.log(email);
        console.log(password);

        const user = await userSchemaModel.findOne({ email: email });
        if (!user) {
            res
                .status(500)
                .json({ error: true, data: {} });
        } else {
            const isPasswordMatch = await passwordHash.verify(
                password,
                user.password
            );
            if (!isPasswordMatch) {
                res.status(500).json({ error: true, data: 'password not match' });
            } else {
                res.status(200).json({
                    error: false, data: user, "loginstatus": "",
                    "token": ""
                });
            }
        }
    },

    getUsers: async (req, res) => {
        const user = await userSchemaModel.find({ usertype: 'user', is_deleted: false }).sort({ created: -1 });
        if (!user) {
            res.status(500).json({ error: true, data: "no user found !" });
        } else {
            res.status(200).json({ error: false, data: user });
        }
    },


    getEmployee: async (req, res) => {
        const user = await userSchemaModel.find({ usertype: 'employee', is_deleted: false }).sort({ created: -1 });
        if (!user) {
            res.status(500).json({ error: true, data: "no user found !" });
        } else {
            res.status(200).json({ error: false, data: user });
        }
    },



    getMe: async (req, res) => {

        const user = await userSchemaModel.find({
            _id: req.body.user_id
        });
        if (!user) {
            res.status(200).json({ error: true, data: [] });
        } else {
            res.status(200).json({ error: false, data: user });
        }

    },

    deleteUser: async (req, res) => {
        const { user_id, is_deleted } = req.body;

        userSchemaModel.updateOne({ _id: user_id }, {
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
    updateUser: async (req, res) => {
        const { user_id, name, email, adl1, adl2, city } = req.body;

        userSchemaModel.updateOne({ _id: user_id }, {
            $set: {
                name: name,
                email: email,
                adl1: adl1,
                adl2: adl2,
                city: city,
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


