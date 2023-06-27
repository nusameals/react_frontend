import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../utils";

const token = localStorage.getItem("token");

export const apiOrder = axios.create({
  baseURL: BASE_URL2.API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
export const apiPayment = axios.create({
  baseURL: BASE_URL2.API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

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
    Authorization: `Bearer ${token}`,
  },
});

export const uploaderAPI = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1"
})

// export const baseAPIand = axios.create({
//   baseURL: "http://nusameals.ddns.net/",
// });
