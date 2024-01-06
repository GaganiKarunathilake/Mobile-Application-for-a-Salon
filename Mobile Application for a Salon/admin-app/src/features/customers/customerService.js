import axios from "axios";
import { base_url } from "../../utils/base_url";
import { json } from "react-router-dom";


const getUsers = async (userData) => {
    const response = await axios.get(`${base_url}user/getUsers`);
    if (!response.data.error) {
        // localStorage.setItem("user", json.stringify(response.data.data));
        return response.data.data;
    } else {
        return [];
    }
};

const getEmployee = async (userData) => {
    const response = await axios.get(`${base_url}user/getEmployee`);
    if (!response.data.error) {
        // localStorage.setItem("user", json.stringify(response.data.data));
        return response.data.data;
    } else {
        return [];
    }
};


const setUser = async (userData) => {
    const response = await axios.post(`${base_url}user/create`, userData);
    return response.data
};

const updateUser = async (userData) => {
    const response = await axios.post(`${base_url}user/update`, userData);
    return response.data
};

const deleteUser = async (userData) => {
    const response = await axios.post(`${base_url}user/delete`, userData);
    return response.data
};

const customerService = {
    getUsers,
    setUser,
    getEmployee,
    updateUser,
    deleteUser,
};

export default customerService;