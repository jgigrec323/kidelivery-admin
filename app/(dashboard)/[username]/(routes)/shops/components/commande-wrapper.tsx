"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { shop, user } from "@prisma/client";

interface ShopWithUser extends shop {
  user: user;
}

interface ShopWrapperProps {
  shops: ShopWithUser[]; // Ensure the data includes the user relation
}

const ShopWrapper: React.FC<ShopWrapperProps> = ({ shops }) => {
  return (
    <div className="p-4 flex flex-col gap-10 bg-white shadow-md rounded-lg">
      <DataTable data={shops} columns={columns} searchKey="name"></DataTable>
    </div>
  );
};

export default ShopWrapper;
