import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getOrders = async (userData) => {
    const response = await axios.get(`${base_url}order/getAll`);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};


const orderService = {
    getOrders,
};

export default orderService;