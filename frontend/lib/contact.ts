import api from "./api";

import {
  ContactCreate,
  ContactUpdate,
} from "@/types/contact";

export async function getContacts() {
  const res = await api.get("/contacts/");
  return res.data;
}

export async function getContact(id: number) {
  const res = await api.get(`/contacts/${id}`);
  return res.data;
}

export async function createContact(data: ContactCreate) {
  const res = await api.post("/contacts/", data);
  return res.data;
}

export async function updateContact(
  id: number,
  data: ContactUpdate
) {
  const res = await api.put(`/contacts/${id}`, data);
  return res.data;
}

export async function deleteContact(id: number) {
  const res = await api.delete(`/contacts/${id}`);
  return res.data;
}