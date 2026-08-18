import api from "./api";

import {
  DocumentCreate,
  DocumentUpdate,
} from "@/types/document";

export async function getDocuments() {
  const res = await api.get("/documents/");
  return res.data;
}

export async function getDocument(id: number) {
  const res = await api.get(`/documents/${id}`);
  return res.data;
}

export async function createDocument(data: DocumentCreate) {
  const res = await api.post("/documents/", data);
  return res.data;
}

export async function updateDocument(
  id: number,
  data: DocumentUpdate
) {
  const res = await api.put(`/documents/${id}`, data);
  return res.data;
}

export async function deleteDocument(id: number) {
  const res = await api.delete(`/documents/${id}`);
  return res.data;
}