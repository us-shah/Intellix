"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getSetting } from "@/lib/settings";

export default function SettingDetailsPage() {
  const params = useParams();

  const [setting, setSetting] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSetting();
  }, []);

  const loadSetting = async () => {
    try {
      const data = await getSetting(Number(params.id));
      setSetting(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  if (!setting) {
    return (
      <div className="p-8 text-center">
        Setting not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          {setting.SettingKey}
        </h1>

        <p className="text-gray-500 mt-2">
          System Setting Details
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">

        <div>
          <h3 className="font-semibold text-gray-600">
            Setting Key
          </h3>

          <p>{setting.SettingKey}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600">
            Setting Value
          </h3>

          <p>{setting.SettingValue}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600">
            Category
          </h3>

          <p>{setting.Category}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600">
            Description
          </h3>

          <p>{setting.Description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600">
            Last Updated
          </h3>

          <p>
            {new Date(setting.UpdatedAt).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}