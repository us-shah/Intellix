import { useEffect, useState } from "react";

import {
  getNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "@/lib/newsletter";

import {
  Newsletter,
  NewsletterCreate,
  NewsletterUpdate,
} from "@/types/newsletter";

export function useNewsletters() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNewsletters() {
    setLoading(true);

    try {
      const data = await getNewsletters();
      setNewsletters(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewsletters();
  }, []);

  async function addNewsletter(data: NewsletterCreate) {
    await createNewsletter(data);
    fetchNewsletters();
  }

  async function editNewsletter(
    id: number,
    data: NewsletterUpdate
  ) {
    await updateNewsletter(id, data);
    fetchNewsletters();
  }

  async function removeNewsletter(id: number) {
    await deleteNewsletter(id);
    fetchNewsletters();
  }

  return {
    newsletters,
    loading,
    fetchNewsletters,
    addNewsletter,
    editNewsletter,
    removeNewsletter,
  };
}