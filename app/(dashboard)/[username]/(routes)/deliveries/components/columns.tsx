import { ColumnDef } from "@tanstack/react-table";
import { parcel } from "@prisma/client";
import { FaEye, FaUserPlus, FaEdit } from "react-icons/fa";

interface ParcelWithDelivery extends parcel {
  delivery?: {
    id: string;
    delivererId: string | null;
  };
}

interface Deliverer {
  id: string;
  name: string;
}

export const createColumns = (
  handleAssignClick: (parcel: ParcelWithDelivery) => void,
  handleStatusClick: (parcel: ParcelWithDelivery) => void,
  handleInfoClick: (parcel: ParcelWithDelivery) => void,
  deliverers: Deliverer[]
): ColumnDef<ParcelWithDelivery>[] => [
  {
    accessorKey: "trackingNumber",
    header: "Suivi",
  },
  {
    accessorKey: "parcelType",
    header: "Type",
  },
  {
    accessorKey: "senderCommune",
    header: "Expéditeur",
  },
  {
    accessorKey: "deliveryCommune",
    header: "Livraison",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <span
        className={`${
          row.original.status === "PENDING"
            ? "text-yellow-500"
            : row.original.status === "IN_TRANSIT"
            ? "text-blue-500"
            : row.original.status === "DELIVERED"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {row.original.status === "PENDING"
          ? "En attente"
          : row.original.status === "IN_TRANSIT"
          ? "En transit"
          : row.original.status === "DELIVERED"
          ? "Livré"
          : "Retour"}
      </span>
    ),
  },
  {
    accessorKey: "recipientName",
    header: "Destinataire",
  },
  {
    accessorKey: "feeAtDoor",
    header: "Paiement",
    cell: ({ row }) =>
      row.original.feeAtDoor
        ? `${row.original.feeAtDoor} GNF`
        : "Non applicable",
  },
  {
    accessorKey: "delivery.delivererId",
    header: "Livreur",
    cell: ({ row }) => {
      const delivererId = row.original.delivery?.delivererId;
      const delivererName = deliverers.find(
        (deliverer) => deliverer.id === delivererId
      )?.name;
      return (
        <span className="text-sm font-medium">
          {delivererName ?? "Non assigné"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2 whitespace-nowrap">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
          title="Assigner Livreur"
          onClick={() => handleAssignClick(row.original)}
        >
          <FaUserPlus />
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white p-1 rounded"
          title="Voir Détails"
          onClick={() => handleInfoClick(row.original)}
        >
          <FaEye />
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white p-1 rounded"
          title="Changer Statut"
          onClick={() => handleStatusClick(row.original)}
        >
          <FaEdit />
        </button>
      </div>
    ),
  },
];
