"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaBolt, FaCodeBranch, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";

const data = [
  { name: "01", a: 10, b: 20, c: 30 },
  { name: "02", a: 40, b: 25, c: 20 },
  { name: "03", a: 35, b: 30, c: 25 },
  { name: "04", a: 50, b: 40, c: 30 },
  { name: "05", a: 80, b: 65, c: 50 },
  { name: "06", a: 70, b: 60, c: 45 },
  { name: "07", a: 60, b: 50, c: 40 },
  { name: "08", a: 50, b: 40, c: 30 },
  { name: "09", a: 30, b: 20, c: 15 },
  { name: "10", a: 20, b: 10, c: 5 },
];

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

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00b97e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00b97e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007a56" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#007a56" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
          <XAxis dataKey="name" stroke="#ccc" tick={{ fontSize: 12 }} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "none" }}
            labelStyle={{ color: "#00ffcc" }}
            itemStyle={{ color: "#ccc" }}
          />
          <Area
            type="monotone"
            dataKey="a"
            stackId="1"
            stroke="#00ff88"
            fill="url(#colorA)"
            strokeWidth={2}
            animationDuration={1200}
            activeDot={{ r: 5, stroke: "#00ff88", strokeWidth: 2, fill: "#101f1d" }}
          />
          <Area
            type="monotone"
            dataKey="b"
            stackId="1"
            stroke="#00b97e"
            fill="url(#colorB)"
            strokeWidth={2}
            animationDuration={1400}
            activeDot={{ r: 5, stroke: "#00b97e", strokeWidth: 2, fill: "#101f1d" }}
          />
          <Area
            type="monotone"
            dataKey="c"
            stackId="1"
            stroke="#007a56"
            fill="url(#colorC)"
            strokeWidth={2}
            animationDuration={1600}
            activeDot={{ r: 5, stroke: "#007a56", strokeWidth: 2, fill: "#101f1d" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
