"use client";

import { useMemo, useState } from "react";
import { Plus, Search, CalendarDays } from "lucide-react";

import { useMeetings } from "@/hooks/useMeetings";

import MeetingModal from "@/components/meeting/MeetingModal";
import MeetingCard from "@/components/meeting/MeetingCard";
import DeleteMeetingDialog from "@/components/meeting/DeleteMeetingDialog";

export default function MeetingsPage() {
  const {
    meetings,
    loading,
    removeMeeting,
    fetchMeetings,
  } = useMeetings();

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting: any) =>
      meeting.Title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [meetings, search]);

  const scheduled = meetings.filter(
    (m: any) => m.Status === "Scheduled"
  ).length;

  const completed = meetings.filter(
    (m: any) => m.Status === "Completed"
  ).length;

  const cancelled = meetings.filter(
    (m: any) => m.Status === "Cancelled"
  ).length;

  return (
    <main className="p-8 text-white">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Meetings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all meetings from one place.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedMeeting(null);
            setOpenModal(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 rounded-lg px-5 py-3 flex items-center gap-2"
        >
          <Plus size={18} />

          Add Meeting

        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Total Meetings</p>
          <h2 className="text-3xl font-bold mt-2">
            {meetings.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Scheduled</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {scheduled}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {completed}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-gray-400">Cancelled</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">
            {cancelled}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search meetings..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800"
        />

      </div>

      {/* Content */}

      {loading ? (

        <div className="text-center py-20">

          <CalendarDays
            size={40}
            className="mx-auto animate-pulse mb-4"
          />

          Loading Meetings...

        </div>

      ) : filteredMeetings.length === 0 ? (

        <div className="text-center py-24">

          <h2 className="text-2xl font-bold">
            No Meetings Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first meeting.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredMeetings.map((meeting: any) => (

            <MeetingCard
              key={meeting.MeetingID}
              meeting={meeting}
              onEdit={(item) => {
                setSelectedMeeting(item);
                setOpenModal(true);
              }}
              onDelete={(item) => {
                setSelectedMeeting(item);
                setDeleteOpen(true);
              }}
            />

          ))}

        </div>

      )}

      {/* Modal */}

      <MeetingModal
        open={openModal}
        meeting={selectedMeeting}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchMeetings}
      />

      {/* Delete Dialog */}

      <DeleteMeetingDialog
        open={deleteOpen}
        meeting={selectedMeeting}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeMeeting(selectedMeeting.MeetingID);

          setDeleteOpen(false);
        }}
      />

    </main>
  );
}