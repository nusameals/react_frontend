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

// test
export const api = {
  login: (body) => {
    return baseAPI.post("/login", body);
  },

  getMenu: () => {
    return baseAPIand.get(`/menus`);
  },
  getMenuById: (id) => {
    return baseAPIand.get(`/menuProduct/:id`);
  },


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

export const apiMenu = {
  getMenu: () => {
    return baseAPIand.get(`/menus`);
  },
  getMenuById: (id) => {
    return baseAPIand.get(`/menuProduct/:id`);
  },
};

// // API Biodata
// getBiodata: () => {
//   return baseAPI.get(`/biodatas`);
// },
// getBiodataById: (id) => {
//   return baseAPI.get(`/biodatas/${id}`);
// },
// createBiodata: (body) => {
//   return baseAPI.post(`/biodatas`, body);
// },
// updateBiodata: (id, body) => {
//   return baseAPI.put(`/biodatas/${id}`, body);
// },
// deleteBiodata: (id) => {
//   return baseAPI.delete(`/biodatas/${id}`);
// },

// // Image Uploader
// uploader: (body) => {
//   return uploaderAPI.post("/dt5fjvwg6/image/upload", body);
// },
