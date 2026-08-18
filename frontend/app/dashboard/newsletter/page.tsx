"use client";

import { useMemo, useState } from "react";
import { Mail, Plus, Search } from "lucide-react";

import { useNewsletters } from "@/hooks/useNewsletters";

import NewsletterCard from "@/components/newsletter/NewsletterCard";
import NewsletterModal from "@/components/newsletter/NewsletterModal";
import DeleteNewsletterDialog from "@/components/newsletter/DeleteNewsletterDialog";

export default function NewslettersPage() {
  const {
    newsletters,
    loading,
    fetchNewsletters,
    removeNewsletter,
  } = useNewsletters();

  const [search, setSearch] = useState("");

  const [selectedSubscriber, setSelectedSubscriber] =
    useState<any>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filtered = useMemo(() => {
    return newsletters.filter((item: any) =>
      item.Email.toLowerCase().includes(
        search.toLowerCase()
      )
    );
  }, [newsletters, search]);

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Newsletter
          </h1>

          <p className="text-gray-400 mt-2">
            Manage newsletter subscribers.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedSubscriber(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Subscriber
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Total Subscribers
          </p>

          <h2 className="text-3xl font-bold">
            {newsletters.length}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Latest Subscriber
          </p>

          <h2 className="text-lg font-semibold truncate">
            {newsletters.length
              ? newsletters[0].Email
              : "-"}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Active
          </p>

          <h2 className="text-3xl font-bold">
            {newsletters.length}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search subscriber..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 py-3"
        />

      </div>

      {loading && (
        <div className="text-center py-20">
          Loading...
        </div>
      )}

      {!loading && filtered.length === 0 && (

        <div className="text-center py-20">

          <Mail
            size={70}
            className="mx-auto text-gray-500"
          />

          <h2 className="text-3xl font-bold mt-6">
            No Subscribers Found
          </h2>

        </div>

      )}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {filtered.map((subscriber: any) => (

          <NewsletterCard
            key={subscriber.SubscriberID}
            newsletter={subscriber}
            onEdit={(item) => {
              setSelectedSubscriber(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedSubscriber(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <NewsletterModal
        open={modalOpen}
        newsletter={selectedSubscriber}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchNewsletters}
      />

      <DeleteNewsletterDialog
        open={deleteOpen}
        newsletter={selectedSubscriber}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeNewsletter(
            selectedSubscriber.SubscriberID
          );
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}