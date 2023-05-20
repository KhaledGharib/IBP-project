import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
export default function LineChart({ chartData }) {
  return <Line data={chartData} />;
}
