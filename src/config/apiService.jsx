import axios from "axios";
import { BASE_URL } from "../utils";

export const apiOrder = axios.create({
    baseURL: "https://6440f37f792fe886a89a01ab.mockapi.io/products",
})

export const baseAPI = axios.create({
  baseURL: BASE_URL.API,
  headers: {
    "Content-Type": "application/json",
  },
});
