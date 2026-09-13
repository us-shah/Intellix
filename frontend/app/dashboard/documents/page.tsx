"use client";

import { useEffect, useState } from "react";
import {
  createDocument,
  updateDocument,
} from "@/lib/document";

interface Props {
  open: boolean;
  document?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DocumentModal({
  open,
  document,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    FileName: "",
    OriginalName: "",
    FileType: "",
    FileSize: 0,
    FilePath: "",
    UploadedBy: 1,
  });

  useEffect(() => {
    if (document) {
      setForm({
        FileName: document.FileName,
        OriginalName: document.OriginalName,
        FileType: document.FileType,
        FileSize: document.FileSize,
        FilePath: document.FilePath,
        UploadedBy: document.UploadedBy,
      });
    } else {
      setForm({
        FileName: "",
        OriginalName: "",
        FileType: "",
        FileSize: 0,
        FilePath: "",
        UploadedBy: 1,
      });
    }
  }, [document]);

  if (!open) return null;

  function change(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "FileSize" || e.target.name === "UploadedBy"
          ? Number(e.target.value)
          : e.target.value,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (document)
        await updateDocument(document.DocumentID, form);
      else
        await createDocument(form);

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <form
        onSubmit={save}
        className="bg-slate-900 rounded-xl p-8 w-full max-w-2xl space-y-4"
      >
        <h2 className="text-3xl font-bold">
          {document ? "Edit Document" : "New Document"}
        </h2>

        <input name="FileName" value={form.FileName} onChange={change} placeholder="Stored File Name" className="w-full bg-slate-800 p-3 rounded" />
        <input name="OriginalName" value={form.OriginalName} onChange={change} placeholder="Original File Name" className="w-full bg-slate-800 p-3 rounded" />
        <input name="FileType" value={form.FileType} onChange={change} placeholder="File Type (pdf, docx...)" className="w-full bg-slate-800 p-3 rounded" />
        <input name="FileSize" type="number" value={form.FileSize} onChange={change} placeholder="File Size" className="w-full bg-slate-800 p-3 rounded" />
        <input name="FilePath" value={form.FilePath} onChange={change} placeholder="File Path / URL" className="w-full bg-slate-800 p-3 rounded" />
        <input name="UploadedBy" type="number" value={form.UploadedBy} onChange={change} placeholder="Uploaded By" className="w-full bg-slate-800 p-3 rounded" />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-6 py-2 rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}