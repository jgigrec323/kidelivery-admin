"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { delivery } from "@prisma/client";
import React from "react";

interface KPIsProps {
  deliveries: delivery[];
}

const KPIs: React.FC<KPIsProps> = ({ deliveries }) => {
  // Calculate KPIs based on the delivery data
  const totalDeliveries = deliveries.length;
  const pendingDeliveries = deliveries.filter(
    (delivery) => delivery.status === "PENDING"
  ).length;
  const inTransitDeliveries = deliveries.filter(
    (delivery) => delivery.status === "IN_TRANSIT"
  ).length;
  const completedDeliveries = deliveries.filter(
    (delivery) => delivery.status === "COMPLETED"
  ).length;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Deliveries */}
      <Card className="bg-grayLight rounded-md">
        <CardHeader>
          <CardTitle>Total des livraisons</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-black">{totalDeliveries}</p>
        </CardContent>
      </Card>

      {/* Pending Deliveries */}
      <Card className="bg-grayLight rounded-md">
        <CardHeader>
          <CardTitle>Livraisons en attente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-black">{pendingDeliveries}</p>
        </CardContent>
      </Card>

      {/* In Transit Deliveries */}
      <Card className="bg-grayLight rounded-md">
        <CardHeader>
          <CardTitle>Livraisons en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-black">{inTransitDeliveries}</p>
        </CardContent>
      </Card>

      {/* Completed Deliveries */}
      <Card className="bg-grayLight rounded-md">
        <CardHeader>
          <CardTitle>Livraisons complétées</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-black">{completedDeliveries}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIs;
