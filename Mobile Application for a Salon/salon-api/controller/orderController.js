"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { orderSchemaModel } = require('../models/orderModel');
const { itemSchemaModel } = require('../models/itemModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

module.exports = {
    createOrder: async (req, res) => {
        const { customer_id, customer_name, total,items} = req.body;    

        const orderModel = orderSchemaModel({
            customer_id:customer_id, 
            customer_name:customer_name, 
            total:total,
            items:items
        });

        orderModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [orderModel]
                });
            }
        });
    },

    getOrders: async (req, res) => {
        const orders = await orderSchemaModel.find().sort({ created: -1 });
        if (!orders) {
            res.status(500).json({ error: true, data: "no orders found !" });
        } else {
            res.status(200).json({ error: false, data: orders });
        }
    },
};


