import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "http://testing.hopto.org",
});
