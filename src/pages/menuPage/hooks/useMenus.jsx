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

// Create Menu
export const usePostMenu = () => {
  const [isLoading, setIsLoading] = useState(false)

  const createMenu = useCallback(async (body, onSuccess) => {
    try {
      setIsLoading(true);
      await apiMenu.createMenu(body)
      onSuccess && onSuccess();
      message.open({
        type: 'success',
        content: `success add a new menu`,
      });
    } catch (err) {
      message.open({
        type: 'error',
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, createMenu]
}

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
