import { useEffect, useState } from "react";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/service";

import {
  Service,
  ServiceCreate,
  ServiceUpdate,
} from "@/types/service";

export function useServices() {

  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(true);

  async function fetchServices() {

    setLoading(true);

    try {

      const data = await getServices();

      setServices(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchServices();

  }, []);

  async function addService(service: ServiceCreate) {

    await createService(service);

    fetchServices();

  }

  async function editService(
    id: number,
    service: ServiceUpdate
  ) {

    await updateService(id, service);

    fetchServices();

  }

  async function removeService(id: number) {

    await deleteService(id);

    fetchServices();

  }

  return {

    services,

    loading,

    fetchServices,

    addService,

    editService,

    removeService,

  };

}