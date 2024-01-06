"use strict";
//created by Hatem Suthura
const express = require("express");
const userRouter = new express.Router();
const appointmentController = require('../controller/appointmentController');
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


userRouter.post("/createappointmentdate", appointmentController.createAppointDate);
userRouter.post("/createappointmentslot", appointmentController.createAppointSlot);
userRouter.get("/getappointmentdates", appointmentController.getAppDates);
userRouter.post("/getappointmentslots", appointmentController.getAppSlots);
userRouter.post("/getAllAppSlots", appointmentController.getAllAppSlots);

userRouter.post("/createcustomerappointment", appointmentController.createCustomerAppointment);
userRouter.post("/getcustomerappointments", appointmentController.getCustomerAppointments);
userRouter.post("/getAllcustomerappointments", appointmentController.getAllCustomerAppointments);

userRouter.post("/deleteSlot", appointmentController.deleteSlot);
userRouter.post("/deleteAppointment", appointmentController.deleteAppointment);


module.exports = userRouter;