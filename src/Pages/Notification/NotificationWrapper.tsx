import React, { Fragment, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "src/store";
import { setSystemNotification } from "src/store/system-notification/systemNotificationSlice";
import { axiosClient } from "src/utils/apis";
import { useToastHook } from "src/utils/hooks/useToast";

function NotificationWrapper({ children }: PropsWithChildren) {
  const { notification } = useSelector(
    (state: RootState) => state.systemNotification
  );
  const { success, error, info } = useToastHook();

  axiosClient.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (err) => {
      if (typeof store !== "undefined")
        store.dispatch(
          setSystemNotification({
            level: "error",
            content: err.response.data.msg,
          })
        );
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    if (notification) {
      if (notification.level === "success") success(notification.content);
      if (notification.level === "error") error(notification.content);
      if (notification.level === "info") info(notification.content);
    }
  }, [notification]);
  
  return <Fragment>{children}</Fragment>;
}

export default NotificationWrapper;
