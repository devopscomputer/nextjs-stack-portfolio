"use client";

import React, { useEffect, useRef, useState } from "react";
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
  Plugin,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { motion } from "framer-motion";

Chart.register(
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function ChartComponent() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [activeSkill, setActiveSkill] = useState<{
    label: string;
    percent: number;
    x: number;
    y: number;
  } | null>(null);

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

    const overlayPercentRaw = [48, 75, 96, 60, 94, 42];
    const overlayData = overlayPercentRaw.map((p) => Math.round((p / 100) * max));

    const normalized = rawData.map((val) => Math.round((val / max) * 100));

    const labels = ["Frontend", "Backend", "DevOps", "Cloud", "Testing", "UI"];

    

    const data: ChartData<"line"> = {
      labels,
      datasets: [
        {
          label: "Skills Progress",
          data: rawData,
          borderColor: gradientStroke,
          backgroundColor: gradientFill,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#00ffcc",
          pointHoverBorderColor: "#00ffaa",
          borderWidth: 4,
        },
        {
          label: "Overlay Guide",
          data: overlayData,
          borderColor: "rgba(0, 255, 100, 0.2)",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    };

    const annotations = normalized
      .map((percent, i) => {
        const isPeak =
          i === 0 ||
          (i > 0 && i < normalized.length - 1 && normalized[i] > normalized[i - 1] && normalized[i] > normalized[i + 1]);
        return isPeak ? { index: i, percent } : null;
      })
      .filter(Boolean) as { index: number; percent: number }[];

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      onClick: (event: ChartEvent, elements: ActiveElement[], chart) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const label = labels[index];
          const value = rawData[index];
          const percent = Math.round((value / max) * 100);
          const meta = chart.getDatasetMeta(0);
          const point = meta.data[index];
          const { x, y } = point.getProps(["x", "y"], true);
          setActiveSkill({ label, percent, x, y });
        } else {
          setActiveSkill(null);
        }
      },
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
              return `Progress: ${Math.round((context.raw as number / max) * 100)}%`;
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
    <div className="w-full flex flex-col relative items-center py-10">
      <motion.h2
        className="text-lg font-semibold text-[#00ff88] text-center tracking-wide uppercase mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Distribuição de Skills Interativas
      </motion.h2>

      <div className="relative w-full h-[380px] max-w-[740px] rounded-xl backdrop-blur-md shadow-[0_0_20px_#00ff8844] group">
        <canvas
          ref={chartRef}
          className="w-full h-full transition-transform duration-500 group-hover:scale-[1.01]"
          width={1320}
          height={400}
        ></canvas>

        {activeSkill && (
          <motion.div
            className="absolute z-10 text-[#00ff88] px-4 py-3 rounded-lg shadow-lg w-[240px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ left: activeSkill.x - 120, top: activeSkill.y - 140 }}
          >
            <h4 className="font-bold text-sm mb-1">{activeSkill.label}</h4>
            <p className="text-xs mb-1">Progresso Atual: {activeSkill.percent}%</p>
            <div className="text-[10px] text-gray-400 leading-tight">
              Projeção baseada em curva de performance técnica.<br />
              <span className="text-[11px] text-cyan-400 font-medium">Clique para expandir detalhes ou comparar.</span>
            </div>
            <div className="mt-2 flex justify-end">
              <button className="text-[10px] px-2 py-1 bg-[#00ff88]/10 border border-[#00ff88] rounded hover:bg-[#00ff88]/20 transition-all">
                Detalhes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
