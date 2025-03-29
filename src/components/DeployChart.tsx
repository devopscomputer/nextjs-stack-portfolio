"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Carrega dinamicamente o ApexCharts apenas no client
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DeployChart = () => {
  const series = [
    {
      name: "Deploy CI/CD",
      data: [
        { x: "Dec 23 2017", y: null },
        { x: "Dec 24 2017", y: 44 },
        { x: "Dec 25 2017", y: 31 },
        { x: "Dec 26 2017", y: 38 },
        { x: "Dec 27 2017", y: null },
        { x: "Dec 28 2017", y: 32 },
        { x: "Dec 29 2017", y: 55 },
        { x: "Dec 30 2017", y: 51 },
        { x: "Dec 31 2017", y: 67 },
        { x: "Jan 01 2018", y: 22 },
        { x: "Jan 02 2018", y: 34 },
        { x: "Jan 03 2018", y: null },
        { x: "Jan 04 2018", y: null },
        { x: "Jan 05 2018", y: 11 },
        { x: "Jan 06 2018", y: 4 },
        { x: "Jan 07 2018", y: 15 },
        { x: "Jan 08 2018", y: null },
        { x: "Jan 09 2018", y: 9 },
        { x: "Jan 10 2018", y: 34 },
        { x: "Jan 11 2018", y: null },
        { x: "Jan 12 2018", y: null },
        { x: "Jan 13 2018", y: 13 },
        { x: "Jan 14 2018", y: null },
      ],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: { enabled: false },
      animations: { enabled: false },
      foreColor: "#ccc",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight", width: 3 },
    fill: {
      opacity: 0.8,
      type: "pattern",
      pattern: {
        style: ["verticalLines"],
        width: 5,
        height: 6,
      },
    },
    markers: {
      size: 5,
      colors: ["#00ff88"],
      strokeColor: "#00ffaa",
      strokeWidth: 2,
      hover: { size: 7 },
    },
    title: {
      text: "Deploy CI/CD & Commits",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#00ff88",
        fontWeight: 600,
      },
    },
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM yyyy" },
      style: { fontSize: "12px" },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#888" },
      },
    },
    yaxis: {
      title: {
        text: "Commits",
        style: { color: "#00ffaa" },
      },
      labels: {
        style: { colors: "#aaa" },
      },
    },
    grid: {
      borderColor: "rgba(0,255,180,0.05)",
      padding: { left: 10, right: 10 },
    },
    theme: { mode: "dark" },
  };

  return (
    <motion.div
      className="w-full max-w-4xl p-4 bg-[#011a13] rounded-xl shadow-[0_0_20px_#00ff8844]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ReactApexChart
        options={options as any}
        series={series as any}
        type="area"
        height={350}
      />
    </motion.div>
  );
};

export default DeployChart;
