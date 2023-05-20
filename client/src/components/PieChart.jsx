import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
export default function PieChart({ chartData }) {
  return <Bar data={chartData} />;
}
