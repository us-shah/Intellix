"use client";

import { useState } from "react";

import useSettings from "@/hooks/useSettings";

import SettingCard from "@/components/settings/SettingCard";
import SettingModal from "@/components/settings/SettingModal";
import DeleteSettingDialog from "@/components/settings/DeleteSettingDialog";

export default function SettingsPage() {
  const {
    settings,
    createSetting,
    updateSetting,
    deleteSetting,
  } = useSettings();

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const newSetting = () => {
    setSelected(null);
    setOpenModal(true);
  };

  const editSetting = (setting: any) => {
    setSelected(setting);
    setOpenModal(true);
  };

  const removeSetting = (setting: any) => {
    setSelected(setting);
    setDeleteOpen(true);
  };

  const saveSetting = async (data: any) => {
    if (selected) {
      await updateSetting(selected.SettingID, data);
    } else {
      await createSetting(data);
    }

    setOpenModal(false);
  };

  const confirmDelete = async () => {
    await deleteSetting(selected.SettingID);

    setDeleteOpen(false);
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            System Settings
          </h1>

          <p className="text-gray-500">
            Manage all application settings.
          </p>
        </div>

        <button
          onClick={newSetting}
          className="bg-cyan-600 text-white px-5 py-3 rounded-lg"
        >
          + New Setting
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {settings?.map((setting: any) => (
          <SettingCard
            key={setting.SettingID}
            setting={setting}
            onEdit={() => editSetting(setting)}
            onDelete={() => removeSetting(setting)}
          />
        ))}

      </div>

      <SettingModal
        open={openModal}
        setting={selected}
        onClose={() => setOpenModal(false)}
        onSave={saveSetting}
      />

      <DeleteSettingDialog
        open={deleteOpen}
        setting={selected}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}