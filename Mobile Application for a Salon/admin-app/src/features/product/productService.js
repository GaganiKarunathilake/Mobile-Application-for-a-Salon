import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getProducts = async (userData) => {
    const response = await axios.get(`${base_url}item/get`);
    if (!response.data.error) {
        return response.data.data;
    } else {
        return [];
    }
};

const setProduct = async (data) => {
    const response = await axios.post(`${base_url}item/create`, data);
    return response.data
};

const updateProduct = async (userData) => {
    const response = await axios.post(`${base_url}item/update`, userData);
    return response.data
};

const deleteProduct = async (userData) => {
    const response = await axios.post(`${base_url}item/delete`, userData);
    return response.data
};

const productService = {
    getProducts,
    setProduct,
    deleteProduct,
    updateProduct,
};

export default productService;