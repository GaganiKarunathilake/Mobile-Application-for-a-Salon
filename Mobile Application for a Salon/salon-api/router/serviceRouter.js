"use strict";
//created by Hatem Suthura
const express = require("express");
const userRouter = new express.Router();
const serviceController = require('../controller/serviceController');
const multer = require('multer');
const verify = require('./verifyToken');
//img path
// http://localhost:5000/uploads/users_profile_img/1582645366303-apple-logo.png
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });


userRouter.post("/create",upload.single('img'), serviceController.createService);
userRouter.post("/get", serviceController.getServices);


module.exports = userRouter;