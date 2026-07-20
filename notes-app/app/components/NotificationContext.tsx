"use client";
import React, { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error";
type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
};

const NotificiationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const showNotification = (
    msg: string,
    notifType: NotificationType = "success",
  ) => {
    setMessage(msg);
    setType(notifType);
    setTimeout(() => setMessage(""), 5000);
  };
  return (
    <NotificiationContext value={{ message, type, showNotification }}>
      {children}
    </NotificiationContext>
  );
};

export const useNotification = () => useContext(NotificiationContext);
