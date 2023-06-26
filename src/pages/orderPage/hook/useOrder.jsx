import { useCallback } from "react"
import { useState } from "react"
import { apiOrders, apiPayments } from "../../../api"
import { message } from "antd"

// Get Orders
export const useGetOrders = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState()

    const getOrders = useCallback(async () => {
        try {
            const res = await apiOrders.getOrders()
            setOrders(res?.data)
        } catch (err) {
            message.open({
                type: 'error',
                content: `${err?.message}`,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return [isLoading, orders, getOrders]

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

export const useGetPaymentById = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [payments, setPayments] = useState();

    const getPaymentsById = useCallback(async (id, onSuccess) => {
        try {
            const res = await apiPayments.getPayments(id);
            if (res) {
                setPayments(res.data);
                onSuccess && onSuccess(res.data);
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

    return [isLoading, payments, getPaymentsById];
};

// Update Orders
export const useUpdateOrders = () => {
    const [isLoading, setIsLoading] = useState(false)

    const updateOrders = useCallback(async (id, body, onSuccess) => {
        try {
            setIsLoading(true);
            await apiOrders.updateOrders(id, body)
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