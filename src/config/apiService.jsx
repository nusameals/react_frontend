import axios from "axios";

export const baseAPI = axios.create({
    baseURL: 'https://6434e0f983a30bc9ad52dff5.mockapi.io/'
})