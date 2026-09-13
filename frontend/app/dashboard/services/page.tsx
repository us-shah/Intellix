"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Wrench } from "lucide-react";

import { useServices } from "@/hooks/useServices";

import ServiceCard from "@/components/service/ServiceCard";
import ServiceModal from "@/components/service/ServiceModal";
import DeleteServiceDialog from "@/components/service/DeleteServiceDialog";

export default function ServicesPage() {
  const {
    services,
    loading,
    fetchServices,
    removeService,
  } = useServices();

  const [search, setSearch] = useState("");

  const [selectedService, setSelectedService] =
    useState<any>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filteredServices = useMemo(() => {
    return services.filter((service: any) =>
      service.ServiceName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [services, search]);

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Services
          </h1>

          <p className="text-gray-400 mt-2">
            Manage company services.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedService(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          New Service
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Total Services
          </p>

          <h2 className="text-3xl font-bold">
            {services.length}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Active
          </p>

          <h2 className="text-3xl font-bold">
            {
              services.filter(
                (s: any) =>
                  s.Status === "Active"
              ).length
            }
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Inactive
          </p>

          <h2 className="text-3xl font-bold">
            {
              services.filter(
                (s: any) =>
                  s.Status === "Inactive"
              ).length
            }
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
          placeholder="Search services..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 py-3"
        />

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-20">
          Loading...
        </div>
      )}

      {/* Empty */}

      {!loading &&
        filteredServices.length === 0 && (

          <div className="text-center py-20">

            <Wrench
              size={70}
              className="mx-auto text-gray-500"
            />

            <h2 className="text-3xl font-bold mt-6">
              No Services Found
            </h2>

          </div>

        )}

      {/* Cards */}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredServices.map((service: any) => (

          <ServiceCard
            key={service.ServiceID}
            service={service}
            onEdit={(item: any) => {
              setSelectedService(item);
              setModalOpen(true);
            }}
            onDelete={(item: any) => {
              setSelectedService(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <ServiceModal
        open={modalOpen}
        service={selectedService}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchServices}
      />

      <DeleteServiceDialog
        open={deleteOpen}
        service={selectedService}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeService(
            selectedService.ServiceID
          );
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}