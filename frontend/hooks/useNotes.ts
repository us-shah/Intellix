import { useEffect, useState } from "react";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/lib/note";

import {
  Note,
  NoteCreate,
  NoteUpdate,
} from "@/types/note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNotes() {
    try {
      setLoading(true);

      const data = await getNotes();

      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote(note: NoteCreate) {
    await createNote(note);
    fetchNotes();
  }

  async function editNote(
    id: number,
    note: NoteUpdate
  ) {
    await updateNote(id, note);
    fetchNotes();
  }

  async function removeNote(id: number) {
    await deleteNote(id);
    fetchNotes();
  }

  return {
    notes,
    loading,
    fetchNotes,
    addNote,
    editNote,
    removeNote,
  };
}