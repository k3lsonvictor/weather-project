import React, { useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  //types
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
const ACCENT_DARK_MODE = "#E0E0AD";
const ACCENT_LIGHT_MODE = "#6AA4CC";
const ACCENT_DARK_MODE_GRADIENT = "224,224,173";
const ACCENT_LIGHT_MODE_GRADIENT = "106,164,204";
const colorSwitch = (theme?: string, i?: number, isGradient?: boolean) => {
  return theme && theme === "light" ? (i === 0 ? isGradient ? ACCENT_LIGHT_MODE_GRADIENT : ACCENT_LIGHT_MODE : isGradient ? ACCENT_DARK_MODE_GRADIENT : ACCENT_DARK_MODE) : (i === 1 ? isGradient ? ACCENT_LIGHT_MODE_GRADIENT : ACCENT_LIGHT_MODE : isGradient ? ACCENT_DARK_MODE_GRADIENT : ACCENT_DARK_MODE)
}

export default function VerticalLineChart({
  height = 500,
  width = 400,
  data = [],
}: {
  height?: number | string;
  width?: number;
  data: { data: { label: string; value: number | string; }[]; }[]
}) {

  const getGradient = useCallback(
    (chart: any) => {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      return gradient;
    },
    [],
  );


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        usePointStyle: true,

        callbacks: {
          title: () => '', // Remove the title
          label: (tooltipItem: any) => ` ${tooltipItem.raw} graus celcius`,
        },
      },
      legend: {
        display: false,
      },

      title: {
        display: false,
      },
    },
    scales: {

      y: {
        suggestedMax: 1,
        display: false,
        grid: {
          display: false,

        },
      },
      x: {
        ticks: {
          padding: 5,
          color: "#f1f1f1",
        },
        grid: {
          tickBorderDash: [0, 1],
          backgroundColor: "#f1f1f1",
          color: "#f1f1f1",
        },
      },
    },
  };

  const chartData = {
    labels: data.length > 0 ? data.sort((a, b) => b.data.length - a.data.length)[0].data.map((item: any) => item.label) : [],
    datasets: !data.length ? [] : data.map((item: {
      data: {
        label: string;
        value: number | string;
      }[]
    }, i: number) => (
      {

        datalabels: {
          display: false,
        },
        //remove label
        label: "",
        data: item.data.map((item: any) => item.value),
        pointRadius: 3,
        pointBackgroundColor: "#272727",
        pointBorderColor: "#ffffff",
        // pointHoverBackgroundColor: colorSwitch(resolvedTheme, i),
        pointHoverRadius: 8,
        linecolor: "#E0E0AD",
        // borderColor: colorSwitch(resolvedTheme, i),
        borderColor: "#E0E0AD",
        //tension
        tension: 0.3,
        borderWidth: 3,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          return getGradient(chart);
        },
        //rounded corners
        borderCapStyle: "round" as const,

      })),
  };

  return <Line options={options} data={chartData} />;
}
