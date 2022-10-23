import axios from "../axios"

const  getFaq = () => {
    return axios.get(`/faq`);
}


export default {
    getFaq: getFaq
};