import { ColumnDef } from "@tanstack/react-table";
import { delivery } from "@prisma/client";
import { FaEdit } from "react-icons/fa";

export const createDeliveryColumns = (
  handleStatusClick: (delivery: delivery) => void
): ColumnDef<delivery & { parcel?: { trackingNumber: string } }>[] => [
  {
    accessorKey: "parcel.trackingNumber",
    header: "Suivi",
    cell: ({ row }) => row.original.parcel?.trackingNumber || "Non disponible",
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
            : row.original.status === "COMPLETED"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "pickupDate",
    header: "Date de Récupération",
    cell: ({ row }) => new Date(row.original.pickupDate).toLocaleDateString(),
  },
  {
    accessorKey: "estimatedArrival",
    header: "Date d'Arrivée Estimée",
    cell: ({ row }) =>
      new Date(row.original.estimatedArrival).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-yellow-500 text-white p-1 rounded"
          title="Changer le Statut"
          onClick={() => handleStatusClick(row.original)}
        >
          <FaEdit />
        </button>
      </div>
    ),
  },
];
