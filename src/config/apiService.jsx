import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../utils";

export const apiOrder = axios.create({
    baseURL: "https://6440f37f792fe886a89a01ab.mockapi.io/products",
})

export const baseAPI = axios.create({
  baseURL: BASE_URL.API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseAPIand = axios.create({
  baseURL: BASE_URL2.API,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const baseAPIand = axios.create({
//   baseURL: "http://nusameals.ddns.net/",
// });
