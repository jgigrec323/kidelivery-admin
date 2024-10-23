import React from "react";
import KPIs from "./components/kpis";
import prismadb from "@/lib/prismadb";
import { delivery } from "@prisma/client"; // Import the Delivery type from Prisma
import RevenueCount from "./components/revenue-count";
import DashboardCharts from "./components/dashboard-charts";
import MainTitle from "@/components/main-title";

const Dashboard = async () => {
  // Fetch deliveries
  const deliveries: delivery[] = await prismadb.delivery.findMany();

  // Fetch deliveries with parcels for the pie chart
  const deliveriesWithParcels = await prismadb.delivery.findMany({
    include: {
      parcel: true, // Include related parcel data
    },
  });

  return (
    <div className="">
      <MainTitle title="Tableau de board" />
      <div className="mt-5 space-y-6">
        <div className="flex justify-between gap-6">
          {/* KPIs and Revenue Count */}
          <RevenueCount />
          <KPIs deliveries={deliveries} />
        </div>

        {/* Charts Section */}
        <DashboardCharts deliveries={deliveriesWithParcels} />
      </div>
    </div>
  );
};

export default Dashboard;
