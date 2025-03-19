import axios from "axios";

const url = "http://localhost:3001/";

export const getCategories = async () => {
    return axios.get(url + "category/all");
};

export const getCities = async () => {
    return axios.get(url + "city/all");
}