import axios from "../axios"

const  getCustomers = () => {
    return axios.get(`/customers`);
}

const  createCustomer = (data) => {
    return axios.post(`/customers`, data);
}

const  sendOTP = (data) => {
    return axios.post(`/customers/sendOTP`, data);
}

export default {
    getCustomers: getCustomers,
    createCustomer: createCustomer,
    sendOTP : sendOTP
};