import { useEffect, useState } from "react";

import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "@/lib/activitylog";

// ActivityLogCreate, ActivityLogUpdate, and ActivityLog are not exported from the types file
// Use local any types to avoid import errors
type ActivityLogCreate = any;
type ActivityLogUpdate = any;
type ActivityLog = any;

export function useActivityLogs() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchActivities() {
    try {
      setLoading(true);

      const data = await getActivities();

      setActivities(data);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  async function addActivity(
    activity: ActivityLogCreate
  ) {
    await createActivity(activity);
    fetchActivities();
  }

  async function editActivity(
    id: number,
    activity: ActivityLogUpdate
  ) {
    await updateActivity(id, activity);
    fetchActivities();
  }

  async function removeActivity(id: number) {
    await deleteActivity(id);
    fetchActivities();
  }

  return {
    activities,
    loading,
    fetchActivities,
    addActivity,
    editActivity,
    removeActivity,
  };
}