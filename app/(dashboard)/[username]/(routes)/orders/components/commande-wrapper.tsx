"use client";
import React from "react";
import CustomTable from "./custom-table";
import { parcel } from "@prisma/client";

interface CommandeWrapperProps {
  parcels: parcel[];
}

const CommandeWrapper: React.FC<CommandeWrapperProps> = ({ parcels }) => {
  return (
    <div className="p-4 flex flex-col gap-10 bg-white shadow-md rounded-lg">
      {/* Pass parcels to the CustomTable */}
      <CustomTable parcels={parcels} />
    </div>
  );
};

export default CommandeWrapper;
