import axios from "../axios"


const  createBuyGetOffer = (data) => {
    return axios.post(`/offers/buyGet`, data);
}

const  createBundleOffer = (data) => {
    return axios.post(`/offers/bundle`, data);
}

export default {
    createBuyGetOffer: createBuyGetOffer,
    createBundleOffer: createBundleOffer
};