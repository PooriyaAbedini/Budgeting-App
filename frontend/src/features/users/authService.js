import axios from 'axios'
import Cookies from 'js-cookies'
const API_URL = '/api/users';

const registerUser = async(userData) => {
    const response = await axios.post(API_URL, userData);
    
    if(response.data) {
        Cookies.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
} 

const loginUser = async(userData) => {
    const response = await axios.post(API_URL + '/login', userData);
    if(response.data) {
        Cookies.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

const logoutUser = async(userData) => {
    Cookies.removeItem('user');
}

const authService = {
    registerUser,
    loginUser,
    logoutUser,
}

export default authService