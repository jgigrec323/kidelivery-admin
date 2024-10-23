import React from "react";
import KPIs from "./components/kpis";
import prismadb from "@/lib/prismadb";
import { delivery } from "@prisma/client"; // Import the Delivery type from Prisma
import RevenueCount from "./components/revenue-count";

const Dashboard = async () => {
  const deliveries: delivery[] = await prismadb.delivery.findMany();

  return (
    <div>
      <div className="flex justify-between gap-6">
        <RevenueCount></RevenueCount>
        <KPIs deliveries={deliveries} />
      </div>
    </div>
  );
};

export default Dashboard;
