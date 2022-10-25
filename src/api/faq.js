import axios from '../axios';

const getFaq = () => {
  return axios.get(`/faq`);
};

const updateFaq = (id, data) => {
  return axios.update(`/faq/${id}`, data);
};

export default {
  getFaq: getFaq,
  updateFaq: updateFaq,
};
