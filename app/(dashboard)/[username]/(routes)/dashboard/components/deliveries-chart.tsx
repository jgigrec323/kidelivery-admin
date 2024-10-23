"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { delivery } from "@prisma/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import COLORS from "@/constants/Colors";

// Register the required components for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the prop types
interface DeliveriesChartProps {
  deliveries: delivery[];
}

const DeliveriesChart: React.FC<DeliveriesChartProps> = ({ deliveries }) => {
  // Calculate status counts for each type of delivery status
  const statusCounts = deliveries.reduce(
    (acc, delivery) => {
      acc[delivery.status] = (acc[delivery.status] || 0) + 1;
      return acc;
    },
    { PENDING: 0, IN_TRANSIT: 0, COMPLETED: 0, CANCELLED: 0 }
  );

  // Prepare the data for the chart
  const data = {
    labels: ["En attente", "En cours", "Livré", "Annulé"], // French labels
    datasets: [
      {
        label: "Livraisons",
        data: [
          statusCounts.PENDING,
          statusCounts.IN_TRANSIT,
          statusCounts.COMPLETED,
          statusCounts.CANCELLED,
        ],
        backgroundColor: [
          COLORS.orange, // For Pending
          COLORS.blue, // For In Progress
          COLORS.green, // For Completed
          "rgba(255, 99, 132, 0.2)", // For Cancelled
        ],
        borderColor: [
          COLORS.orange, // For Pending
          COLORS.blue, // For In Progress
          COLORS.green, // For Completed
          "rgba(255, 99, 132, 1)", // For Cancelled
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define options for better chart styling and tooltips
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: COLORS.black, // Make the legend label black
        },
      },
      tooltip: {
        backgroundColor: COLORS.black, // Black background for tooltips
        titleColor: COLORS.white, // White title text in tooltips
        bodyColor: COLORS.white, // White body text in tooltips
        padding: 10,
        borderColor: COLORS.orange,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: COLORS.black, // Make the x-axis labels black
        },
        grid: {
          display: false, // Remove x-axis grid lines for a cleaner look
        },
      },
      y: {
        ticks: {
          color: COLORS.black, // Make the y-axis labels black
        },
        grid: {
          color: COLORS.grayLight, // Add light grid lines on the y-axis
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Statut des livraisons</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DeliveriesChart;
