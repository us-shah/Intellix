import { useEffect, useState } from "react";

import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/document";

import {
  Document,
  DocumentCreate,
  DocumentUpdate,
} from "@/types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDocuments() {
    setLoading(true);

    try {
      const data = await getDocuments();
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function addDocument(data: DocumentCreate) {
    await createDocument(data);
    fetchDocuments();
  }

  async function editDocument(
    id: number,
    data: DocumentUpdate
  ) {
    await updateDocument(id, data);
    fetchDocuments();
  }

  async function removeDocument(id: number) {
    await deleteDocument(id);
    fetchDocuments();
  }

  return {
    documents,
    loading,
    fetchDocuments,
    addDocument,
    editDocument,
    removeDocument,
  };
}