"use client";

import { useMemo, useState } from "react";
import { History, Plus, Search } from "lucide-react";

import { useActivityLogs } from "@/hooks/useActivityLogs";

import ActivityLogCard from "@/components/activityLog/ActivityLogCard";
import ActivityLogModal from "@/components/activityLog/ActivityLogModal";
import DeleteActivityLogDialog from "@/components/activityLog/DeleteActivityLogDialog";

export default function ActivityLogPage() {
  const {
    activities,
    loading,
    fetchActivities,
    removeActivity,
  } = useActivityLogs();

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity: any) => {
      return (
        activity.Action
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        activity.TableName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [activities, search]);

  return (
    <main className="p-8 text-white">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Activity Logs
          </h1>

          <p className="text-gray-400 mt-2">
            Track all user activities.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedActivity(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Activity
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Total Activities</p>
          <h2 className="text-3xl font-bold mt-2">
            {activities.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Tables</p>
          <h2 className="text-3xl font-bold mt-2">
            {
              new Set(
                activities.map((a: any) => a.TableName)
              ).size
            }
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Users</p>
          <h2 className="text-3xl font-bold mt-2">
            {
              new Set(
                activities.map((a: any) => a.UserID)
              ).size
            }
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
          placeholder="Search activities..."
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

      {!loading && filteredActivities.length === 0 && (
        <div className="text-center py-20">

          <History
            size={60}
            className="mx-auto mb-4 text-gray-500"
          />

          <h2 className="text-2xl font-bold">
            No Activities Found
          </h2>

        </div>
      )}

      {/* Cards */}

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">

        {filteredActivities.map((activity: any) => (

          <ActivityLogCard
            key={activity.ActivityID}
            activity={activity}
            onEdit={(item) => {
              setSelectedActivity(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedActivity(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <ActivityLogModal
        open={modalOpen}
        activity={selectedActivity}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchActivities}
      />

      <DeleteActivityLogDialog
        open={deleteOpen}
        activity={selectedActivity}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeActivity(
            selectedActivity.ActivityID
          );
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}