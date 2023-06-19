import { useCallback, useState } from "react";
import { Alert, message } from "antd";
import { api } from "../../../api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (body, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.login(body);

      console.log({ res });

      if (res) {
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("id", res.data?.id);
        localStorage.setItem("username", res.data?.username);
        message.open({
          type: "success",
          content: "Successfully, redirect to system. Please wait...",
        });
        onSuccess && onSuccess();
      }
    } catch (err) {
      message.open({
        type: "error",
        content: "Incorrect username or password, please try again",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return [isLoading, login];
};
