import prismadb from "@/lib/prismadb";
import { order } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/formatMoney";

async function RevenueCount() {
  const orders: order[] = await prismadb.order.findMany();
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <Card className="flex-1 bg-black text-white">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-white">
          {formatMoney(totalRevenue)}
        </p>
      </CardContent>
    </Card>
  );
}

export default RevenueCount;
