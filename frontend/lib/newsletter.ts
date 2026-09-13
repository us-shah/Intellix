import api from "./api";

import {
  NewsletterCreate,
  NewsletterUpdate,
} from "@/types/newsletter";

export async function getNewsletters() {
  const res = await api.get("/newsletter/");
  return res.data;
}

export async function getNewsletter(id: number) {
  const res = await api.get(`/newsletter/${id}`);
  return res.data;
}

export async function createNewsletter(data: NewsletterCreate) {
  const res = await api.post("/newsletter/", data);
  return res.data;
}

export async function updateNewsletter(
  id: number,
  data: NewsletterUpdate
) {
  const res = await api.put(`/newsletter/${id}`, data);
  return res.data;
}

export async function deleteNewsletter(id: number) {
  const res = await api.delete(`/newsletter/${id}`);
  return res.data;
}