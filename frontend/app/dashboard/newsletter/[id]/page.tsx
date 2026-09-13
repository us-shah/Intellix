"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Calendar,
  Mail,
} from "lucide-react";

import { getNewsletter } from "@/lib/newsletter";

export default function NewsletterDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [subscriber, setSubscriber] =
    useState<any>(null);

  useEffect(() => {
    loadSubscriber();
  }, []);

  async function loadSubscriber() {
    const data = await getNewsletter(
      Number(id)
    );

    setSubscriber(data);
  }

  if (!subscriber)
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
            size={32}
            className="text-cyan-400"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {subscriber.Email}
            </h1>

            <p className="text-gray-400">
              Newsletter Subscriber
            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>

            <h3 className="text-gray-400">
              Subscriber ID
            </h3>

            <p>{subscriber.SubscriberID}</p>

          </div>

          <div>

            <h3 className="text-gray-400">
              Email
            </h3>

            <p>{subscriber.Email}</p>

          </div>

          <div>

            <h3 className="text-gray-400">
              Joined
            </h3>

            <div className="flex items-center gap-2">

              <Calendar size={18} />

              {new Date(
                subscriber.CreatedAt
              ).toLocaleString()}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}