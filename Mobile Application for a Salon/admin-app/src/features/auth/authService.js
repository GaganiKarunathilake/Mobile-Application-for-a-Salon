import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data)); // Corrected usage of JSON and response
    }
    return response.data;
  } catch (error) {
    // Handle any potential errors here
    console.error("Error during login:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

const authService = {
  login,
};

export default authService;
