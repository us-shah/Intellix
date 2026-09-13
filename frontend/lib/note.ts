import api from "./api";
import { NoteCreate, NoteUpdate } from "@/types/note";

export async function getNotes() {
  const response = await api.get("/notes/");
  return response.data;
}

export async function getNote(id: number) {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: NoteCreate) {
  const response = await api.post("/notes/", data);
  return response.data;
}

export async function updateNote(
  id: number,
  data: NoteUpdate
) {
  const response = await api.put(`/notes/${id}`, data);
  return response.data;
}

export async function deleteNote(id: number) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}