"use strict";
//created by Hatem Suthura
const Joi = require('joi');
const passwordHash = require("password-hash");
const { categorySchemaModel } = require('../models/categoryModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');



module.exports = {
    createCategory: async (req, res) => {
        const { category } = req.body;

        const categoryModel = categorySchemaModel({
            category_name: category
        });

        categoryModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: [categoryModel]
                });
            }
        });
    },

    getCategory: async (req, res) => {
        const cats = await categorySchemaModel.find({is_deleted:false});
        res.status(200).json({
            error: false,
            data: cats
        });      
    },

    updateCategory: async (req, res) => {
        const { category, category_id } = req.body;

        categorySchemaModel.updateOne({_id:category_id}, { $set: {
            category_name: category
        }}, (err, response) => {
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

    deleteCategory: async (req, res) => {
        const {  category_id } = req.body;

        categorySchemaModel.updateOne({_id:category_id}, { $set: {
            is_deleted:true
        }}, (err, response) => {
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


