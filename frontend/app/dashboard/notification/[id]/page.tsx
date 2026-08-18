"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Bell } from "lucide-react";

import { getNotification } from "@/lib/notification";

export default function NotificationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    loadNotification();
  }, []);

  async function loadNotification() {
    try {
      const data = await getNotification(Number(id));
      setNotification(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!notification) {
    return (
      <main className="p-8 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-cyan-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <div className="flex items-center gap-3 mb-6">

          <Bell className="text-cyan-400" />

          <h1 className="text-3xl font-bold">
            {notification.Title}
          </h1>

        </div>

        <div className="space-y-6">

          <div>
            <p className="text-gray-400">Message</p>
            <p className="mt-2">
              {notification.Message}
            </p>
          </div>

          <div>
            <p className="text-gray-400">User ID</p>
            <p>{notification.UserID}</p>
          </div>

          <div>
            <p className="text-gray-400">Status</p>

            <span
              className={`px-4 py-2 rounded-full ${
                notification.IsRead
                  ? "bg-green-700"
                  : "bg-yellow-700"
              }`}
            >
              {notification.IsRead
                ? "Read"
                : "Unread"}
            </span>

          </div>

        </div>

      </div>

    </main>
  );
}