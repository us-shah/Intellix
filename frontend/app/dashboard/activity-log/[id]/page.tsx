"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, History } from "lucide-react";

import { getActivity } from "@/lib/activitylog";

export default function ActivityDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [activity, setActivity] = useState<any>(null);

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    try {
      const data = await getActivity(Number(id));
      setActivity(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!activity) {
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

          <History className="text-cyan-400" />

          <h1 className="text-3xl font-bold">
            Activity #{activity.ActivityID}
          </h1>

        </div>

        <div className="space-y-6">

          <div>
            <p className="text-gray-400">Action</p>
            <p>{activity.Action}</p>
          </div>

          <div>
            <p className="text-gray-400">Table Name</p>
            <p>{activity.TableName}</p>
          </div>

          <div>
            <p className="text-gray-400">Record ID</p>
            <p>{activity.RecordID}</p>
          </div>

          <div>
            <p className="text-gray-400">User ID</p>
            <p>{activity.UserID}</p>
          </div>

        </div>

      </div>

    </main>
  );
}