import { apiOrder } from "../config/apiService";
import { baseAPI } from "../config/apiService";
import { baseAPIand } from "../config/apiService";

export const apiOrders = {
  // API orders
  getOrders: () => {
    return apiOrder.get(`/orders`);
  },
  getOrdersById: (id) => {
    return apiOrder.get(`/orders/${id}`);
  },
  updateOrders: (id, body) => {
    return apiOrder.put(`/orders/${id}`, body);
  },
};

export const api = {
  login: (body) => {
    return baseAPI.post("/login", body);
  },
};

export const apiMenu = {
  getMenu: () => {
    return baseAPIand.get(`/menus`);
  },
  getMenuById: (id) => {
    return baseAPIand.get(`/menuProduct/:id`);
  },
};
