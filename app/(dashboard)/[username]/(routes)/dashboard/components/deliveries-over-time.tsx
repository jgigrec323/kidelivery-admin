"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { delivery } from "@prisma/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Line chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DeliveriesOverTimeChartProps {
  deliveries: delivery[];
}

const DeliveriesOverTimeChart: React.FC<DeliveriesOverTimeChartProps> = ({
  deliveries,
}) => {
  const [timeRange, setTimeRange] = useState<"daily" | "monthly" | "yearly">(
    "daily"
  );

  // Group deliveries by the selected time range
  const groupDeliveries = (timeRange: "daily" | "monthly" | "yearly") => {
    const counts: Record<string, number> = {};

    deliveries.forEach((delivery) => {
      const date = new Date(delivery.pickupDate);
      let key = "";

      if (timeRange === "daily") {
        key = date.toLocaleDateString(); // Group by day
      } else if (timeRange === "monthly") {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Group by month
      } else if (timeRange === "yearly") {
        key = `${date.getFullYear()}`; // Group by year
      }

      counts[key] = (counts[key] || 0) + 1;
    });

    return counts;
  };

  const deliveryCounts = groupDeliveries(timeRange);

  // Prepare the data for the Line chart
  const data = {
    labels: Object.keys(deliveryCounts), // Dates, months, or years
    datasets: [
      {
        label: "Livraisons",
        data: Object.values(deliveryCounts),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Livraisons au fil du temps</h2>

      {/* Toggle between daily, monthly, yearly */}
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => setTimeRange("daily")}
          className={`px-4 py-2 ${
            timeRange === "daily" ? "bg-orange text-white" : "bg-gray-200"
          } rounded`}
        >
          Quotidien
        </button>
        <button
          onClick={() => setTimeRange("monthly")}
          className={`px-4 py-2 ${
            timeRange === "monthly" ? "bg-orange text-white" : "bg-gray-200"
          } rounded`}
        >
          Mensuel
        </button>
        <button
          onClick={() => setTimeRange("yearly")}
          className={`px-4 py-2 ${
            timeRange === "yearly" ? "bg-orange text-white" : "bg-gray-200"
          } rounded`}
        >
          Annuel
        </button>
      </div>

      {/* Render the Line Chart */}
      <Line data={data} />
    </div>
  );
};

export default DeliveriesOverTimeChart;
