import { useCallback } from "react"
import { useState } from "react"
import { apiOrders, apiPayments } from "../../../api"
import { message } from "antd"

// Get Payments
export const useGetOrders = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const getOrders = useCallback(async (onSuccess) => {
        try {
            const res = await apiOrders.getOrders()
            if (res) {
                setData(res.data);
                onSuccess && onSuccess(res.data);
            }
        } catch (err) {
            message.open({
                type: 'error',
                content: `${err?.message}`,
            });
        } finally {
            setIsLoading(false);
            message.open({
                type: 'success',
                content: "Berhasil Fetch Data!",
            });
        }
    }, []);
    return [isLoading, data, getOrders]
}

// Get Orders by Id
export const useGetOrdersById = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [dataById, setData] = useState()

    const getOrdersById = useCallback(async (id, onSuccess) => {
        try {
            const res = await apiOrders.getOrdersById(id)
            if (res) {
                console.log({ res })
                setData(res.data);
                onSuccess && onSuccess(res.data);
            }
        } catch (err) {
            message.open({
                type: 'error',
                content: `${err?.message}`,
            });
        } finally {
            setIsLoading(false);
            message.open({
                type: "success",
                content: "Berhasil Fetch Data!",
            });
        }
    }, []);

    return [isLoading, dataById, getOrdersById]
}

// Get Payments
export const useGetPayments = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [payments, setPayments] = useState()

    const getPayments = useCallback(async (onSuccess) => {
        try {
            const res = await apiPayments.getPayments()
            if (res) {
                setPayments(res.data);
                onSuccess && onSuccess(res.data);
            }
        } catch (err) {
            message.open({
                type: 'error',
                content: `${err?.message}`,
            });
        } finally {
            setIsLoading(false);
            message.open({
                type: 'success',
                content: "Berhasil Fetch Data!",
            });
        }
    }, []);
    return [isLoading, payments, getPayments]
}

// get payment by username
export const useGetPaymentByOrderId = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setdata] = useState();

    const getPaymentsByOrderId = useCallback(async (order_id, onSuccess) => {
        try {
            const res = await apiPayments.getPaymentsByOrderId(order_id);
            if (res) {
                setdata(res.data[0]);
                onSuccess && onSuccess(res.data[0]);
            }
        } catch (error) {
            message.open({
                type: "error",
                content: `${error?.message}`,
            });
        } finally {
            setIsLoading(false);
            message.open({
                type: "success",
                content: "Berhasil Fetch Data!",
            });
        }
    }, []);

    return [isLoading, data, getPaymentsByOrderId];
};


// Update Orders
export const useUpdateOrders = () => {
    const [isLoading, setIsLoading] = useState(false)

    const updateOrders = useCallback(async (id, body, onSuccess) => {
        try {
            setIsLoading(true);
            await apiOrders.updateOrderById(id, body)
            onSuccess && onSuccess();
        } catch (err) {
            message.open({
                type: 'error',
                content: `${err?.message}`,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return [isLoading, updateOrders]
}
