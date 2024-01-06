import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getBanners = async (userData) => {
    const response = await axios.get(`${base_url}banner/get`);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const createBanner = async (data) => {
    const response = await axios.post(`${base_url}banner/create`, data);
    return response.data
};


const offerService = {
    getBanners,
    createBanner,
};

export default offerService;