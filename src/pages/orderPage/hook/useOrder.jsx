import { useCallback } from "react"
import { useState } from "react"
import { apiOrders } from "../../../api"
import { message } from "antd"

// Get Orders
export const useGetOrders = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const getData = useCallback(async (onSuccess) => {
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
                type: "success",
                content: "Berhasil Fetch Data!",
            });
        }
    }, []);

    return [isLoading, data, getData]

}

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