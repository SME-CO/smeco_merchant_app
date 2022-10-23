import axios from "../axios"

const  getProducts = () => {
    return axios.get(`/products`);
}

const  productCheckout = (data) => {
    return axios.post(`/products/purchase/checkout`, data);
}

const  createProduct = (data) => {
    return axios.post(`/products`, data);
}

const  getProductsByCategory = (category) => {
    return axios.get(`/products/categories/${category}`);
} 

export default {
    getProducts: getProducts,
    createProduct: createProduct,
    getProductsByCategory : getProductsByCategory,
    productCheckout : productCheckout
};