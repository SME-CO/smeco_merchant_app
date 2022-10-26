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
    const merchant = parseInt(window.localStorage.getItem('merchant_id'));
    return axios.get(`/products/categories/${category}/${merchant}`);
} 

const  uploadImage = (data, productId) => {
    return axios.post(`/products/upload/image/${productId}`, data);
}

export default {
    getProducts: getProducts,
    createProduct: createProduct,
    getProductsByCategory : getProductsByCategory,
    productCheckout : productCheckout,
    uploadImage : uploadImage
};