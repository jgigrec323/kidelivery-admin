import React from "react";
import prismadb from "@/lib/prismadb";
import RevenueChart from "./revenue-chart";
import DeliveriesChart from "./deliveries-chart";
import DeliveriesByCommuneChart from "./deliveries-by-commune";
import { delivery, order } from "@prisma/client"; // Import Prisma types
import DeliveriesOverTimeChart from "./deliveries-over-time";

interface DashboardChartsProps {
  deliveries: delivery[]; // Deliveries will come from parent
}

const DashboardCharts: React.FC<DashboardChartsProps> = async ({
  deliveries,
}) => {
  // Fetch orders for revenue
  const orders: order[] = await prismadb.order.findMany();

  // Calculate the monthly revenue
  const monthlyRevenue = orders.reduce((acc: number[], order) => {
    const month = new Date(order.createdAt).getMonth();
    acc[month] = (acc[month] || 0) + order.amount;
    return acc;
  }, new Array(12).fill(0)); // Initialize array for 12 months

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-2">
      {/* First Row */}
      <RevenueChart monthlyRevenue={monthlyRevenue} />
      <DeliveriesByCommuneChart deliveries={deliveries} />

      {/* Second Row */}
      <DeliveriesChart deliveries={deliveries} />

      {/* Fourth Chart (Placeholder) */}
      <DeliveriesOverTimeChart
        deliveries={deliveries}
      ></DeliveriesOverTimeChart>
    </div>
  );
};

export default DashboardCharts;
