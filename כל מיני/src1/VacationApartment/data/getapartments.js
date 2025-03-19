import axios from "axios";

const url = "apartment";

export const getAll = async () => {
return axios.get(url+"/all");
};

export const getById = async (id) => {
return axios.get(url+"/"+id);
};

export const getByCity = async (city) => {
    return axios.get(url+"/city/"+city);
};

export const getByCategory = async (category) => {
    return axios.get(url+"/category/"+category);
};

export const getByCount = async (count,compare) => {
    return axios.get(url+"/"+compare+"/"+count);
};