import { useCallback, useState } from "react"
import { api } from "../../../api"
import { Alert, message } from "antd"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login = useCallback(async (body, onSuccess) => {
        try {
            setIsLoading(true)
            const res = await api.login(body)

            console.log({res})

            if (res) {
                localStorage.setItem("token", res.data?.token);
                localStorage.setItem("id", res.data?.id);
                localStorage.setItem("username", res.data?.username);
                message.open({
                    type: 'success',
                    content: 'Berasil Login!',
                })
                onSuccess && onSuccess()
            }
        }
        catch (err) {
            message.open({
                type: 'error',
                content: `${err?.message}` 
            })
        }
        finally {
            setIsLoading(false)
        }
    }, [])
    return [isLoading, login]
}