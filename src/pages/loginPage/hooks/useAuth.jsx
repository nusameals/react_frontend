import { useCallback, useState } from "react"
import { api } from "../../../api"
import { message } from "antd"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login = useCallback(async (body, onSuccess) => {
        try {
            setIsLoading(true)
            const res = await api.login(body)
            if (res) {
                message.open({
                    type: 'success',
                    content: 'Login Success'
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