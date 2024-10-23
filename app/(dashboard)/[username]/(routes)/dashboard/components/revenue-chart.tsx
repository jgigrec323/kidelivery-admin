"use client";
import React from "react";
import { Line } from "react-chartjs-2";
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
import COLORS from "@/constants/Colors";

// Register the required components for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the prop types
interface RevenueChartProps {
  monthlyRevenue: number[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ monthlyRevenue }) => {
  // Prepare the data for the chart
  const data = {
    labels: [
      "Janv",
      "Févr",
      "Mars",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sept",
      "Oct",
      "Nov",
      "Déc",
    ],
    datasets: [
      {
        label: "Revenu (GNF)",
        data: monthlyRevenue,
        borderColor: COLORS.orange,
        backgroundColor: COLORS.orange, // Orange with opacity for better visuals
        fill: true, // Fill the area below the line
        tension: 0.4, // This makes the line smoother and curved
        pointBackgroundColor: COLORS.orange, // Color of the points on the line
        pointBorderColor: COLORS.orange, // Border color of the points
        pointBorderWidth: 2, // Size of point borders
        pointRadius: 4, // Size of points
      },
    ],
  };

  // Chart options for design improvements
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
      <h2 className="text-xl font-bold mb-4">Graphique des revenus</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
