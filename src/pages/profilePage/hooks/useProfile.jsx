import { useCallback, useState } from "react";
import { Modal, message } from "antd";
import { api, apiMenu } from "../../../api";

export const useGetProfileById = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setdata] = useState();
  
    const getData = useCallback(async (id, onSuccess) => {
      try {
        const res = await apiMenu.getProfileById(id);
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