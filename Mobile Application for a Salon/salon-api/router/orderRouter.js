"use strict";
//created by Hatem Suthura
const express = require("express");
const userRouter = new express.Router();
const orderController = require('../controller/orderController');
const multer = require('multer');
const verify = require('./verifyToken');

const storage = multer.diskStorage({
    destination: 'uploads/users_profile_img',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });


userRouter.post("/create", orderController.createOrder);
userRouter.get("/getAll", orderController.getOrders);


module.exports = userRouter;