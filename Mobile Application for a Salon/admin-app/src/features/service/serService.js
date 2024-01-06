import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getService = async (userData) => {
    const response = await axios.post(`${base_url}service/get`,userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const setService = async (data) => {
    const response = await axios.post(`${base_url}service/create`, data);
    return response.data
};


const deleteService = async (userData) => {
    const response = await axios.post(`${base_url}service/delete`, userData);
    return response.data
};

const serService = {
    getService,
    setService,
    deleteService,
};

export default serService;