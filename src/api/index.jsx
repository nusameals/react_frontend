import { apiOrder } from '../config/apiService'

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
}