import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getChat = async (userData) => {
    const response = await axios.post(`${base_url}chat/get`, userData);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const setChat = async (data) => {
    const response = await axios.post(`${base_url}chat/create`, data);
    return response.data
};


const chatService = {
    getChat,
    setChat,
};

export default chatService;