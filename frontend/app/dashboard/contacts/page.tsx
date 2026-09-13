"use client";

import { useMemo, useState } from "react";
import { Mail, Plus, Search } from "lucide-react";

import { useContacts } from "@/hooks/useContacts";

import ContactCard from "@/components/contact/ContactCard";
import ContactModal from "@/components/contact/ContactModal";
import DeleteContactDialog from "@/components/contact/DeleteContactDialog";

export default function ContactsPage() {
  const {
    contacts,
    loading,
    fetchContacts,
    removeContact,
  } = useContacts();

  const [search, setSearch] = useState("");

  const [selectedContact, setSelectedContact] =
    useState<any>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact: any) =>
      `${contact.FullName} ${contact.Email} ${contact.Subject}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [contacts, search]);

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Contacts
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all contact messages.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedContact(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Contact
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Total Contacts</p>
          <h2 className="text-3xl font-bold">
            {contacts.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">New</p>
          <h2 className="text-3xl font-bold">
            {
              contacts.filter(
                (c: any) => c.Status === "New"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Resolved</p>
          <h2 className="text-3xl font-bold">
            {
              contacts.filter(
                (c: any) => c.Status === "Resolved"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-4 text-gray-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search contacts..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 py-3"
        />

      </div>

      {loading && (
        <div className="text-center py-20">
          Loading...
        </div>
      )}

      {!loading &&
        filteredContacts.length === 0 && (

          <div className="text-center py-20">

            <Mail
              size={70}
              className="mx-auto text-gray-500"
            />

            <h2 className="text-3xl font-bold mt-6">
              No Contacts Found
            </h2>

          </div>

        )}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredContacts.map((contact: any) => (

          <ContactCard
            key={contact.ContactID}
            contact={contact}
            onEdit={(item) => {
              setSelectedContact(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedContact(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <ContactModal
        open={modalOpen}
        contact={selectedContact}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchContacts}
      />

      <DeleteContactDialog
        open={deleteOpen}
        contact={selectedContact}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeContact(
            selectedContact.ContactID
          );
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}