// components/custom-table.tsx (Client Component)
"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { parcel } from "@prisma/client";

interface CustomTableProps {
  parcels: parcel[]; // Adjust type according to your schema
}

const CustomTable: React.FC<CustomTableProps> = ({ parcels }) => {
  return (
    <DataTable searchKey="trackingNumber" columns={columns} data={parcels} />
  );
};

export default CustomTable;
