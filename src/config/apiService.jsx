import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "http://nusameals.ddns.net/",
});

