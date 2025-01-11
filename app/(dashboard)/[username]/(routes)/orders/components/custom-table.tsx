"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { createColumns } from "./columns";
import { parcel } from "@prisma/client";
import { ParcelInfoModal } from "@/components/ui/parcel-info-modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDeliverers, selectAllDeliverers } from "@/store/deliverer-slice";
import SelectModal from "@/components/ui/select-modal";
import { useRouter } from "next/navigation";

interface ParcelWithDelivery extends parcel {
  delivery?: {
    id: string;
    delivererId: string | null;
  };
}

interface CustomTableProps {
  parcels: ParcelWithDelivery[]; // Ensure delivery field is available
}

const CustomTable: React.FC<CustomTableProps> = ({ parcels }) => {
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] =
    useState<ParcelWithDelivery | null>(null);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const deliverers = useAppSelector(selectAllDeliverers); // Fetch all deliverers

  // Fetch deliverers on component mount
  useEffect(() => {
    dispatch(fetchDeliverers());
  }, [dispatch]);

  // Handlers for modal actions
  const handleAssignClick = (parcel: ParcelWithDelivery) => {
    setSelectedParcel(parcel);
    setAssignModalOpen(true);
  };

  const handleStatusClick = (parcel: ParcelWithDelivery) => {
    setSelectedParcel(parcel);
    setStatusModalOpen(true);
  };

  const handleInfoClick = (parcel: ParcelWithDelivery) => {
    setSelectedParcel(parcel);
    setInfoModalOpen(true);
  };

  const handleAssignDeliverer = async (delivererId: string) => {
    if (!selectedParcel) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deliverer/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parcelId: selectedParcel.id, // Use parcel ID
            delivererId, // Use selected deliverer ID
          }),
        }
      );

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Error assigning deliverer:", await response.json());
      }
    } catch (error) {
      console.error("Failed to assign deliverer:", error);
    } finally {
      setAssignModalOpen(false);
    }
  };

  const columns = createColumns(
    handleAssignClick,
    handleStatusClick,
    handleInfoClick,
    deliverers // Pass deliverers to map names in the table
  );

  return (
    <div>
      <DataTable searchKey="trackingNumber" columns={columns} data={parcels} />

      {/* Assign Modal */}
      {assignModalOpen && (
        <SelectModal
          title="Assigner Colis"
          options={deliverers.map((deliverer) => ({
            label: deliverer.name,
            value: deliverer.id, // Use deliverer ID as the value
          }))}
          onSelect={(value) => handleAssignDeliverer(value)}
          open={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
        />
      )}

      {/* Status Change Modal */}
      {statusModalOpen && (
        <SelectModal
          title="Changer le Statut"
          options={[
            { label: "PENDING", value: "PENDING" },
            { label: "IN TRANSIT", value: "IN_TRANSIT" },
            { label: "DELIVERED", value: "DELIVERED" },
            { label: "RETURNED", value: "RETURNED" },
          ]}
          onSelect={(value) => {
            console.log("New Status:", value);
            setStatusModalOpen(false);
          }}
          open={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
        />
      )}

      {/* Info Modal */}
      {infoModalOpen && selectedParcel && (
        <ParcelInfoModal
          parcel={selectedParcel}
          open={infoModalOpen}
          onClose={() => setInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomTable;
