"use client";

import { useMemo, useState } from "react";
import { Bell, Plus, Search } from "lucide-react";

import { useNotifications } from "@/hooks/useNotifications";

import NotificationCard from "@/components/notification/NotificationCard";
import NotificationModal from "@/components/notification/NotificationModal";
import DeleteNotificationDialog from "@/components/notification/DeleteNotificationDialog";

export default function NotificationPage() {
  const {
    notifications,
    loading,
    fetchNotifications,
    removeNotification,
  } = useNotifications();

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification: any) => {
      return (
        notification.Title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.Message
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [notifications, search]);

  const total = notifications.length;

  const read = notifications.filter((n: any) => n.IsRead).length;

  const unread = total - read;

  return (
    <main className="p-8 text-white">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-400 mt-2">
            Manage system notifications.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedNotification(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Notification
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Total</p>
          <h2 className="text-3xl font-bold mt-2">{total}</h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Read</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {read}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Unread</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {unread}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-4 text-gray-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notifications..."
          className="w-full pl-11 py-3 rounded-xl bg-slate-900 border border-slate-800"
        />

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-20">
          Loading...
        </div>
      )}

      {/* Empty */}

      {!loading && filteredNotifications.length === 0 && (
        <div className="text-center py-20">

          <Bell
            size={55}
            className="mx-auto mb-4 text-gray-500"
          />

          <h2 className="text-2xl font-bold">
            No Notifications Found
          </h2>

        </div>
      )}

      {/* Cards */}

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">

        {filteredNotifications.map((notification: any) => (

          <NotificationCard
            key={notification.NotificationID}
            notification={notification}
            onEdit={(item) => {
              setSelectedNotification(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedNotification(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <NotificationModal
        open={modalOpen}
        notification={selectedNotification}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchNotifications}
      />

      <DeleteNotificationDialog
        open={deleteOpen}
        notification={selectedNotification}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeNotification(
            selectedNotification.NotificationID
          );
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}