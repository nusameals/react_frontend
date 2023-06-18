import { useCallback, useState } from "react";
import { api } from "../../../api/apiAndi.jsx";
import { message } from "antd";

export const useGetMenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();

  const getData = useCallback(async (onSuccess) => {
    try {
      const res = await api.getMenu();
      if (res) {
        setdata(res.data.data);
        onSuccess && onSuccess(res.data.data);
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

  return [isLoading, data, getData];
};


export const useGetMenuById = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();

  const getData = useCallback(async (id, onSuccess) => {
    try {
      const res = await api.getMenu(id);
      if (res) {
        setdata(res.data);
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

  return [isLoading, data, getData];
};


