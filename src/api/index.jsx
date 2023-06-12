import { baseAPI } from "../config/apiService";

export const api = {
  login: (body) => {
    return baseAPI.post("/login", body);
  },
};
