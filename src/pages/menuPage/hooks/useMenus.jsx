import { useCallback, useState } from "react";
import { Modal, message } from "antd";
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

export const useDeleteMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteData = useCallback(async (id, onSuccess) => {
    try {
      setIsLoading(true);
      await apiMenu.deleteMenu(id);
      onSuccess && onSuccess();
      Modal.success({
        type: "success",
        content: "Berhasil Menghapus Data!",
        okText: "Done"
      });
    } catch (error) {
      message.open({
        type: "error",
        content: `${error?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return [isLoading, deleteData];
};
