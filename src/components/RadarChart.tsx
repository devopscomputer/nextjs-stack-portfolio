
"use client";

import React, { useRef, useEffect } from "react";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController, // ✅ necessário para "radar"
  ChartOptions,
  ChartData,
} from "chart.js";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

export default function RadarChart() {
  const radarRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = radarRef.current?.getContext("2d");
    if (!ctx) return;

    const data: ChartData<"radar"> = {
      labels: ["Frontend", "Backend", "DevOps", "Cloud", "Testing", "UI"],
      datasets: [
        {
          label: "Skill Coverage",
          data: [75, 90, 65, 80, 70, 85],
          backgroundColor: "rgba(0, 255, 136, 0.15)",
          borderColor: "#00ff88",
          borderWidth: 2,
          pointBackgroundColor: "#00ff88",
          pointHoverRadius: 6,
          pointRadius: 4,
        },
        {
          label: "Potential",
          data: [60, 80, 70, 85, 65, 90],
          backgroundColor: "rgba(0, 128, 90, 0.1)",
          borderColor: "rgba(0, 128, 90, 0.35)",
          borderDash: [4, 4],
          borderWidth: 2,
          pointBackgroundColor: "rgba(0, 128, 90, 0.7)",
          pointHoverRadius: 6,
          pointRadius: 3,
        },
      ],
    };

    const options: ChartOptions<"radar"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#00ff88",
            font: { size: 14 },
          },
        },
        tooltip: {
          backgroundColor: "#0f1f1d",
          titleColor: "#00ffcc",
          bodyColor: "#ccc",
          borderColor: "#00ff88",
          borderWidth: 1,
        },
      },
      scales: {
        r: {
          angleLines: {
            color: "rgba(0, 255, 180, 0.05)",
          },
          grid: {
            color: "rgba(0, 255, 180, 0.05)",
          },
          pointLabels: {
            color: "#ccc",
            font: {
              size: 13,
            },
          },
          ticks: {
            color: "#00ff88",
            backdropColor: "transparent",
          },
        },
      },
    };

    const chart = new Chart(ctx, {
      type: "radar",
      data,
      options,
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="relative w-full h-[300px] max-w-[620px] rounded-xl p-4 transition duration-500 ease-in-out ">

        <canvas
          ref={radarRef}
          className="w-full h-full transition-transform duration-500 hover:scale-[1.01]"
        ></canvas>
      </div>
    </div>
  );
}
