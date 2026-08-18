import { useEffect, useState } from "react";

import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/blog";

import {
  Blog,
  BlogCreate,
  BlogUpdate,
} from "@/types/blog";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBlogs() {
    setLoading(true);

    try {
      const data = await getBlogs();
      setBlogs(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function addBlog(data: BlogCreate) {
    await createBlog(data);
    fetchBlogs();
  }

  async function editBlog(
    id: number,
    data: BlogUpdate
  ) {
    await updateBlog(id, data);
    fetchBlogs();
  }

  async function removeBlog(id: number) {
    await deleteBlog(id);
    fetchBlogs();
  }

  return {
    blogs,
    loading,
    fetchBlogs,
    addBlog,
    editBlog,
    removeBlog,
  };
}