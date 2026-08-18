import api from "./api";

import {
  BlogCreate,
  BlogUpdate,
} from "@/types/blog";

export async function getBlogs() {
  const res = await api.get("/blogs/");
  return res.data;
}

export async function getBlog(id: number) {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
}

export async function createBlog(data: BlogCreate) {
  const res = await api.post("/blogs/", data);
  return res.data;
}

export async function updateBlog(
  id: number,
  data: BlogUpdate
) {
  const res = await api.put(`/blogs/${id}`, data);
  return res.data;
}

export async function deleteBlog(id: number) {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
}