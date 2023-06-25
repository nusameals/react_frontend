import { useCallback } from "react";
import { useState } from "react";
import { apiImage } from "../api";
import { message } from "antd";

export const useSingleUploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const upload = useCallback(async (body, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await apiImage.uploader(body);
      if (res) {
        onSuccess && onSuccess(res.data);
      }
    } catch (err) {
      message.open({
        type: "error",
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
      message.open({
        type: "success",
        content: "Image berhasil di upload!",
      });
    }
  }, []);

  return [isLoading, upload];
};

