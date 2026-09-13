import { useEffect, useState } from "react";
import {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "@/lib/meeting";
import {
  Meeting,
  MeetingCreate,
  MeetingUpdate,
} from "@/types/Meeting";

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const data = await getMeetings();

      setMeetings(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const addMeeting = async (meeting: MeetingCreate) => {
    await createMeeting(meeting);
    await fetchMeetings();
  };

  const editMeeting = async (
    id: number,
    meeting: MeetingUpdate
  ) => {
    await updateMeeting(id, meeting);
    await fetchMeetings();
  };

  const removeMeeting = async (id: number) => {
    await deleteMeeting(id);
    await fetchMeetings();
  };

  return {
    meetings,
    loading,
    error,
    fetchMeetings,
    addMeeting,
    editMeeting,
    removeMeeting,
  };
}