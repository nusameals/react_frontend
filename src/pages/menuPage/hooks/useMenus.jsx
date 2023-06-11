import { useCallback, useState } from "react";
import { api } from "../../../api/apiAndi.jsx";
import { message } from "antd";

export const useGetMenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState();

  const getData = useCallback(async () => {
    try {
      const res = await api.getMenu();
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
