import axios from "axios";

export const baseAPI = axios.create({
    baseURL: '13.229.218.76:8080'
})