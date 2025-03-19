import axios from "axios";

export const getCategories = async () => {
    return axios.get("category");
};

export const getCities = async () => {
    return axios.get("city");
}