import { useCallback, useState } from "react";
import { Modal, message } from "antd";
import { api, apiMenu } from "../../../api";
import { useParams } from "react-router-dom";

export const useUploader = () => {
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)

  const upload = useCallback(async (body, onSuccess) => {
    try {
      setIsLoadingUpload(true)
      const res = await api.uploader(body)
      if(res) {
        onSuccess && onSuccess(res.data)
      }
    }
    catch (err) {
      message.open({
        type: 'error',
        content: `${err?.message}`,
      })
    }
    finally {
      setIsLoadingUpload(false)
      message.open({
        type: 'success',
        content: 'Upload image success!'
      })
    }
  }, [])
  return [isLoadingUpload, upload]
}

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

// Create Menu
export const usePostMenu = () => {
  const [isLoadingPostMenu, setIsLoadingPostMenu] = useState(false)

  const createMenu = useCallback(async (body, onSuccess) => {
    try {
      setIsLoadingPostMenu(true);
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
      setIsLoadingPostMenu(false);
    }
  }, []);

  return [isLoadingPostMenu, createMenu]
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

export const useUpdateMenu = () => {
  const [isLoadingUpdateMenu, setIsLoadingUpdateMenu] = useState(false)

  const updateMenu = useCallback(async (id, body, onSuccess) => {
    try {
      setIsLoadingUpdateMenu(true);
      await apiMenu.updateMenu(id, body)
      onSuccess && onSuccess();
      message.open({
        type: 'success',
        content: `success change a data menu`,
      });
    } catch (err) {
      message.open({
        type: 'error',
        content: `${err?.message}`,
      });
    } finally {
      setIsLoadingUpdateMenu(false);
    }
  }, []);

  return [isLoadingUpdateMenu, updateMenu]
}
