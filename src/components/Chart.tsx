"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
  Plugin
} from "chart.js";
import { motion } from "framer-motion";
import { FaCode, FaCloud, FaLaptopCode } from "react-icons/fa";

Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export default function ChartComponent() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const gradientStroke = ctx.createLinearGradient(0, 0, 600, 0);
    gradientStroke.addColorStop(0, "rgba(38, 126, 84, 0.68)");
    gradientStroke.addColorStop(1, "#00ff88");

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, "rgba(0, 255, 180, 0.2)");
    gradientFill.addColorStop(1, "rgba(0, 255, 150, 0)");

    const rawData = [8000, 12000, 5000, 9000, 4000, 11000];
    const max = Math.max(...rawData);
    const normalized = rawData.map((val) => Math.round((val / max) * 100));

    const data: ChartData<"line"> = {
      labels: ["Frontend", "Backend", "DevOps", "Cloud", "Testing", "UI"],
      datasets: [
        {
          label: "Skills Progress",
          data: rawData,
          borderColor: gradientStroke,
          backgroundColor: gradientFill,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#00ffcc",
          pointHoverBorderColor: "#00ffaa",
          borderWidth: 4,
        },
      ],
    };

    const annotations = normalized.map((percent, i) => {
      const isPeak =
        i === 0 ||
        (i > 0 && i < normalized.length - 1 &&
          normalized[i] > normalized[i - 1] &&
          normalized[i] > normalized[i + 1]);
      return isPeak ? { index: i, percent } : null;
    }).filter(Boolean) as { index: number; percent: number }[];

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f1f1d",
          titleColor: "#00ffcc",
          bodyColor: "#ccc",
          borderColor: "#00ff88",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `Progress: ${Math.round((context.raw as number) / max * 100)}%`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#ccc",
            font: { size: 12 },
          },
        },
        y: {
          ticks: {
            color: "#ccc",
            font: { size: 10 },
            callback: function (value) {
              return `${Math.round((Number(value) / max) * 100)}%`;
            },
          },
          grid: {
            drawTicks: false,
            color: "rgba(0,255,180,0.05)",
          },
        },
      },
    };

    const shadowPlugin: Plugin<"line"> = {
      id: "shadowLine",
      beforeDatasetsDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,255,180,0.5)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 6;
      },
      afterDatasetsDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.restore();

        const meta = chart.getDatasetMeta(0);
        annotations.forEach(({ index, percent }) => {
          const point = meta.data[index];
          if (!point) return;
          ctx.save();
          ctx.font = "bold 10px sans-serif";
          ctx.fillStyle = "#00ff88";
          ctx.textAlign = "center";
          ctx.fillText(`${percent}%`, point.x, point.y - 10);
          ctx.restore();
        });
      },
    };

    const chart = new Chart(ctx, {
      type: "line",
      data,
      options,
      plugins: [shadowPlugin],
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-10">
      <motion.h2
        className="text-lg font-semibold text-[#00ff88] text-center tracking-wide uppercase mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Distribuição de Skills Técnicas
      </motion.h2>

      <div className="flex justify-around text-[#00ff88] text-sm mb-4">
        <motion.div className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <FaLaptopCode className="text-[#00ff88] group-hover:animate-pulse" /> Frontend
        </motion.div>
        <motion.div className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <FaCode className="text-[#00b97e] group-hover:animate-spin-slow" /> Backend
        </motion.div>
        <motion.div className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <FaCloud className="text-[#007a56] group-hover:animate-ping-slow" /> Cloud
        </motion.div>
      </div>

      <div className="relative w-full h-[380px] max-w-[1540px] rounded-xl backdrop-blur-md shadow-[0_0_20px_#00ff8844] group">
        <canvas
          ref={chartRef}
          className="w-full h-full transition-transform duration-500 group-hover:scale-[1.01]"
          width={1320}
          height={400}
        ></canvas>
      </div>
    </div>
  );
}
