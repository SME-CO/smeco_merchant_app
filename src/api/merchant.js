import axios from "../axios"


const  createMerchant = (data) => {
    return axios.post(`/merchants`, data);
}

const  login = (data) => {
    return axios.post(`/merchants/login`, data);
}

const getAllMerchants = (data) => {
    return axios.get(`/merchants`, data);
} 

const  uploadCover = (data, merchantId) => {
    return axios.post(`/merchants/upload/cover/${merchantId}`, data);
}


export default {
    login: login,
    createMerchant: createMerchant,
    getAllMerchants: getAllMerchants,
    uploadCover : uploadCover
};