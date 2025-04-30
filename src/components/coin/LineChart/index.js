import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import { convertNumber } from "../../../functions/convertNumber";

function LineChart({ chartData, PriceType,multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: !!multiAxis,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
