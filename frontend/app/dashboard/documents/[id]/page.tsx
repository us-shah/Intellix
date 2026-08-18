"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText } from "lucide-react";

import { getDocument } from "@/lib/document";

export default function DocumentDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    loadDocument();
  }, []);

  async function loadDocument() {
    const data = await getDocument(Number(id));
    setDocument(data);
  }

  if (!document)
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );

  return (

    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-cyan-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <div className="flex items-center gap-4 mb-8">

          <FileText
            size={34}
            className="text-cyan-400"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {document.OriginalName}
            </h1>

            <p className="text-gray-400">
              {document.FileType}
            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>
            <h3 className="text-gray-400">Stored File Name</h3>
            <p>{document.FileName}</p>
          </div>

          <div>
            <h3 className="text-gray-400">File Type</h3>
            <p>{document.FileType}</p>
          </div>

          <div>
            <h3 className="text-gray-400">File Size</h3>
            <p>{document.FileSize} KB</p>
          </div>

          <div>
            <h3 className="text-gray-400">Uploaded By</h3>
            <p>{document.UploadedBy}</p>
          </div>

          <div>
            <h3 className="text-gray-400">Created</h3>
            <p>
              {new Date(document.CreatedAt).toLocaleString()}
            </p>
          </div>

          <div>
            <h3 className="text-gray-400 mb-2">Document</h3>

            <a
              href={document.FilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg"
            >
              <Download size={18} />
              Open / Download
            </a>
          </div>

        </div>

      </div>

    </main>
  );
}