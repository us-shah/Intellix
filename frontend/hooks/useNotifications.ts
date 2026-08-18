import { useEffect, useState } from "react";

import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "@/lib/notification";

import {
  Notification,
  NotificationCreate,
  NotificationUpdate,
} from "@/types/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function fetchNotifications() {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function addNotification(
    notification: NotificationCreate
  ) {
    await createNotification(notification);

    fetchNotifications();
  }

  async function editNotification(
    id: number,
    notification: NotificationUpdate
  ) {
    await updateNotification(id, notification);

    fetchNotifications();
  }

  async function removeNotification(id: number) {
    await deleteNotification(id);

    fetchNotifications();
  }

  return {
    notifications,
    loading,
    fetchNotifications,
    addNotification,
    editNotification,
    removeNotification,
  };
}