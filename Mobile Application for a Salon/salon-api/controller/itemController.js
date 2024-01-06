"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { itemSchemaModel } = require('../models/itemModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');



module.exports = {
    createItem: async (req, res) => {
        const { name, price, quantity } = req.body;

        var post_img = '';

        if (req.file) {
            post_img = req.file.filename;
        }

        const itemModel = itemSchemaModel({
            name: name,
            price: price,
            quantity: quantity,
            image: post_img
        });

        itemModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [itemModel]
                });
            }
        });
    },

    getItems: async (req, res) => {
        const items = await itemSchemaModel.find({ is_deleted: false }).sort({ created: -1 });
        if (!items) {
            res.status(500).json({ error: true, data: "no items found !" });
        } else {
            res.status(200).json({ error: false, data: items });
        }

    },


    deleteItem: async (req, res) => {
        const { item_id, is_deleted } = req.body;

        itemSchemaModel.updateOne({ _id: item_id }, {
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

    updateItem: async (req, res) => {
        const { item_id, name, price, quantity } = req.body;


        var post_img = '';

        if (req.file) {
            post_img = req.file.filename;
        }


        itemSchemaModel.updateOne({ _id: item_id }, {
            $set: {
                name: name,
                price: price,
                quantity: quantity,
                image: post_img
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


