import { createContext, useContext } from "react";
import { initialNotifications } from "../data/mockData";
import { useLocalStorage } from "../hooks/useLocalStorage";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useLocalStorage("fooddash-notifications", initialNotifications);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    );
  };

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  };

  const pushNotification = (notification) => {
    setNotifications((current) => [{ ...notification, id: `n-${Date.now()}`, read: false }, ...current]);
  };

  const value = {
    notifications,
    unreadCount: notifications.filter((notification) => !notification.read).length,
    markAsRead,
    markAllRead,
    pushNotification,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error("useNotifications must be used within NotificationsProvider");
  return context;
}
