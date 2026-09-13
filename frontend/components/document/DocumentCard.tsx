"use client";

import { FileText, Download, Pencil, Trash2 } from "lucide-react";

interface Props {
  document: any;
  onEdit: (document: any) => void;
  onDelete: (document: any) => void;
}

export default function DocumentCard({
  document,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition">

      <div className="flex items-start gap-4">

        <div className="bg-cyan-500/20 p-3 rounded-xl">
          <FileText className="text-cyan-400" size={28} />
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-bold">
            {document.OriginalName}
          </h2>

          <p className="text-gray-400">
            {document.FileName}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

            <div>
              <p className="text-gray-500">Type</p>
              <p>{document.FileType}</p>
            </div>

            <div>
              <p className="text-gray-500">Size</p>
              <p>{document.FileSize} KB</p>
            </div>

            <div>
              <p className="text-gray-500">Uploaded By</p>
              <p>{document.UploadedBy}</p>
            </div>

            <div>
              <p className="text-gray-500">Created</p>
              <p>
                {new Date(document.CreatedAt).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <a
          href={document.FilePath}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Download size={16} />
          Open
        </a>

        <button
          onClick={() => onEdit(document)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(document)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}