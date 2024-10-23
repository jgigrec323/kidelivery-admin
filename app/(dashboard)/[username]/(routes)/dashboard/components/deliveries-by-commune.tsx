"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import COLORS from "@/constants/Colors";
import { delivery } from "@prisma/client";

// Register the required components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

// Modify the type to account for included parcel data
interface DeliveriesByCommuneChartProps {
  deliveries: (delivery & { parcel: { deliveryCommune: string } })[];
}

const DeliveriesByCommuneChart: React.FC<DeliveriesByCommuneChartProps> = ({
  deliveries,
}) => {
  // Calculate number of deliveries by delivery commune from parcel
  const communeCounts = deliveries.reduce((acc, delivery) => {
    const commune = delivery.parcel?.deliveryCommune || "Inconnu"; // Default to 'Inconnu' if no deliveryCommune
    acc[commune] = (acc[commune] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare the data for the pie chart
  const data = {
    labels: Object.keys(communeCounts),
    datasets: [
      {
        label: "Livraisons par Commune",
        data: Object.values(communeCounts),
        backgroundColor: [
          COLORS.orange,
          COLORS.blue,
          COLORS.green,
          "rgba(255, 99, 132, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          COLORS.orange,
          COLORS.blue,
          COLORS.green,
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options to reduce the size of the pie chart and make it responsive
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 15,
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-lg h-full">
      <h2 className="text-xl font-bold mb-4">
        Répartition des livraisons par commune
      </h2>
      {/* Flex-grow ensures the chart takes up the available space */}
      <div className="flex-grow">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default DeliveriesByCommuneChart;
