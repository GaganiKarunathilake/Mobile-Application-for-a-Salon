"use strict";
//created by Hatem Suthura
const express = require("express");
const chatRouter = new express.Router();
const multer = require('multer');
const verify = require('./verifyToken');
const chatController = require("../controller/chatController");

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });


chatRouter.post("/create", chatController.createChat);
chatRouter.post("/get", chatController.getChat);


module.exports = chatRouter;