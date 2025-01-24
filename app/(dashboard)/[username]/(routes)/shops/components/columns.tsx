"use client";

import { shop, user } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

export const columns: ColumnDef<shop & { user: user }>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "commune",
    header: "Commune",
  },
  {
    accessorKey: "quartier",
    header: "Quartier",
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    accessorKey: "user",
    header: "Propriétaire",
    cell: ({ row }) => row.original.user.name || "Non attribué",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const handleEdit = () => {
        const shopId = row.original.id;
        console.log("Edit shop:", shopId);
        // Add your logic for navigating to the edit page or opening a modal
      };

      const handleDelete = () => {
        const shopId = row.original.id;
        if (confirm("Êtes-vous sûr de vouloir supprimer cette boutique ?")) {
          console.log("Delete shop:", shopId);
          // Add your delete logic here (API call)
        }
      };

      return (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
            title="Modifier"
            onClick={handleEdit}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
            title="Supprimer"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
      );
    },
  },
];
