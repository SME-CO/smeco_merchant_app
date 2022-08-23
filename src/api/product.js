import axios from "../axios"

const  getProducts = () => {
    return axios.get(`/products`);
}

const  createProduct = (data) => {
    return axios.post(`/products`, data);
}



export default {
    getProducts: getProducts,
    createProduct: createProduct,

};