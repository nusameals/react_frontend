import { useCallback, useState } from "react";
import { message } from "antd";
import { apiMenu } from "../../../api";
import { useParams } from "react-router-dom";

export const useGetMenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();

  const getData = useCallback(async (onSuccess) => {
    try {
      const res = await apiMenu.getMenu();
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

export const useGetBiodata = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();

  const getData = useCallback(async () => {
    try {
      const res = await api.getBiodata();
      setdata(res.data);
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


export const useGetMenuById = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();

  const getData = useCallback(async (onSuccess) => {
    try {
      const res = await apiMenu.getMenuById(id);
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


