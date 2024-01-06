import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getAppointments = async (userData) => {
    const response = await axios.get(`${base_url}appointment/getappointmentdates`);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};


const getAllcustomerappointments = async (userData) => {
    const response = await axios.post(`${base_url}appointment/getAllcustomerappointments`);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};


const createappointmentdate = async (userData) => {
    const response = await axios.post(`${base_url}appointment/createappointmentdate`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const createappointmentslot = async (userData) => {
    const response = await axios.post(`${base_url}appointment/createappointmentslot`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const getappointmentdates = async (userData) => {
    const response = await axios.get(`${base_url}appointment/getappointmentdates`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};



const getappointmentslots = async (userData) => {
    const response = await axios.post(`${base_url}appointment/getappointmentslots`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const getAllAppSlots = async (userData) => {
    const response = await axios.post(`${base_url}appointment/getAllAppSlots`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const getcustomerappointments = async (userData) => {
    const response = await axios.post(`${base_url}appointment/getcustomerappointments`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const deleteSlot = async (userData) => {
    const response = await axios.post(`${base_url}appointment/deleteSlot`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};


const deleteAppointment = async (userData) => {
    const response = await axios.post(`${base_url}appointment/deleteAppointment`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};


const appointmentService = {
    getAppointments,
    getAllcustomerappointments,
    createappointmentdate,
    createappointmentslot,
    getappointmentdates,
    getappointmentslots,
    getcustomerappointments,
    getAllAppSlots,
    deleteSlot,
    deleteAppointment,

};

export default appointmentService;