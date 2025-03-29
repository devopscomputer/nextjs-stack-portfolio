"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaBolt, FaCodeBranch, FaDatabase } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const data = {
  labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  datasets: [
    {
      label: "Dataset A",
      data: [10, 40, 35, 50, 80, 70, 60, 50, 30, 20],
      fill: true,
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(0,255,136,0.15)");
        gradient.addColorStop(1, "rgba(0,255,136,0)");
        return gradient;
      },
      borderColor: "#00ff88",
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#00ff88",
      pointHoverRadius: 5,
    },
    {
      label: "Dataset B",
      data: [20, 25, 30, 40, 65, 60, 50, 40, 20, 10],
      fill: true,
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(0,185,126,0.15)");
        gradient.addColorStop(1, "rgba(0,185,126,0)");
        return gradient;
      },
      borderColor: "#00b97e",
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#00b97e",
      pointHoverRadius: 5,
    },
    {
      label: "Dataset C",
      data: [30, 20, 25, 30, 50, 45, 40, 30, 15, 5],
      fill: true,
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(0,122,86,0.15)");
        gradient.addColorStop(1, "rgba(0,122,86,0)");
        return gradient;
      },
      borderColor: "#007a56",
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#007a56",
      pointHoverRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#111",
      titleColor: "#00ffcc",
      bodyColor: "#ccc",
      borderColor: "#00ff88",
      borderWidth: 1,
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
      grid: {
        drawTicks: false,
        color: "rgba(0,255,180,0.05)",
      },
      ticks: {
        color: "#ccc",
        font: { size: 10 },
      },
    },
  },
};

export default function Charts() {
  return (
    <div className="w-full mt-[100px] px-6 py-10 rounded-2xl transition-all duration-700 group">
      <motion.h2
        className="text-lg font-semibold mb-6 text-[#00ff88] text-center tracking-wide uppercase"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Atividade Técnica por Dia
      </motion.h2>

      <div className="flex justify-around text-[#00ff88] text-sm mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 hover:scale-105 hover:text-[#00ffaa] transition-all duration-300"
        >
          <FaBolt className="text-[#00ff88] animate-pulse group-hover:drop-shadow-[0_0_8px_#00ff88]" /> 84 Ações
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 hover:scale-105 hover:text-[#00ffaa] transition-all duration-300"
        >
          <FaCodeBranch className="text-[#00b97e] animate-spin-slow group-hover:drop-shadow-[0_0_8px_#00b97e]" /> 56 Commits
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 hover:scale-105 hover:text-[#00ffaa] transition-all duration-300"
        >
          <FaDatabase className="text-[#007a56] animate-ping-slow group-hover:drop-shadow-[0_0_8px_#007a56]" /> 23 Queries
        </motion.div>
      </div>

      <div className="relative  w-full h-[320px] max-w-[680px] rounded-xl backdrop-blur-md shadow-[0_0_20px_#00ff8844] p-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
