import React from "react";
import prismadb from "@/lib/prismadb";
import DeliveriesChart from "./deliveries-chart";

const DashboardThirdRow = async () => {
  // Fetch deliveries with related parcels
  const deliveries = await prismadb.delivery.findMany();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Deliveries by Commune (using parcel data) */}
      <DeliveriesChart deliveries={deliveries}></DeliveriesChart>
    </div>
  );
};

export default DashboardThirdRow;
