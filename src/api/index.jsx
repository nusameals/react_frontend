import { apiOrder, uploaderAPI } from "../config/apiService";
import { apiPayment } from "../config/apiService";
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

export const apiPayments = {
  // API payments
  getPayments: () => {
    return apiPayment.get(`/payments`);
  },
  getPaymentsByUsername: (username) => {
    return apiPayment.get(`/payments/${username}`);
  },
}

export const api = {
  login: (body) => {
    return baseAPI.post("/login", body);
  },
  uploader: (body) => {
    return uploaderAPI.post("/dbqsoenus/image/upload", body)
}
};

export const apiMenu = {
  getMenu: () => {
    return baseAPIand.get(`/menus`);
  },
  getMenuById: (id) => {
    return baseAPIand.get(`/menus/${id}`);
  },
  deleteMenu: (id) => {
    return baseAPIand.delete(`/menus/${id}`);
  },
  createMenu: (body) => {
    return baseAPIand.post(`/menus`, body)
  },

  // profile
  getProfileById: (id)=>{
    return baseAPIand.get(`/admin/user/id?ID=${id}`);
  }

};
