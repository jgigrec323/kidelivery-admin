"use client";

import { user } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

import { format } from "date-fns";

export const columns: ColumnDef<user>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "phoneNumber",
    header: "Numéro de téléphone",
  },
  {
    accessorKey: "role",
    header: "Rôle",
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const handleEdit = () => {
        const userId = row.original.id;
        console.log("Edit user:", userId);
        // Add your logic for navigating to the edit page or opening a modal
      };

      const handleDelete = () => {
        const userId = row.original.id;
        if (confirm("Êtes-vous sûr de vouloir supprimer cet user ?")) {
          console.log("Delete user:", userId);
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
