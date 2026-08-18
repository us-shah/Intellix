"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";

import { getContact } from "@/lib/contact";

export default function ContactDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [contact, setContact] =
    useState<any>(null);

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    const data = await getContact(Number(id));
    setContact(data);
  }

  if (!contact)
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

          <Mail
            size={34}
            className="text-cyan-400"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {contact.FullName}
            </h1>

            <p className="text-gray-400">
              {contact.Status}
            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>
            <h3 className="text-gray-400">Email</h3>
            <p>{contact.Email}</p>
          </div>

          <div>
            <h3 className="text-gray-400">Phone</h3>
            <p>{contact.Phone}</p>
          </div>

          <div>
            <h3 className="text-gray-400">Subject</h3>
            <p>{contact.Subject}</p>
          </div>

          <div>
            <h3 className="text-gray-400">Message</h3>
            <p>{contact.Message}</p>
          </div>

          <div>
            <h3 className="text-gray-400">Created</h3>
            <p>
              {new Date(
                contact.CreatedAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}