"use client";
import React from "react";
import CustomTable from "./custom-table";
import { delivery } from "@prisma/client";

interface CommandeWrapperProps {
  deliveries: delivery[];
}

const CommandeWrapper: React.FC<CommandeWrapperProps> = ({ deliveries }) => {
  return (
    <div className="p-4 flex flex-col gap-10 bg-white shadow-md rounded-lg">
      {/* Pass deliveries to the CustomTable */}
      <CustomTable deliveries={deliveries} />
    </div>
  );
};

export default CommandeWrapper;
