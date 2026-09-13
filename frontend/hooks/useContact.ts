import { useEffect, useState } from "react";

import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/lib/contact";

import {
  Contact,
  ContactCreate,
  ContactUpdate,
} from "@/types/contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchContacts() {
    setLoading(true);

    try {
      const data = await getContacts();
      setContacts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function addContact(contact: ContactCreate) {
    await createContact(contact);
    fetchContacts();
  }

  async function editContact(
    id: number,
    contact: ContactUpdate
  ) {
    await updateContact(id, contact);
    fetchContacts();
  }

  async function removeContact(id: number) {
    await deleteContact(id);
    fetchContacts();
  }

  return {
    contacts,
    loading,
    fetchContacts,
    addContact,
    editContact,
    removeContact,
  };
}