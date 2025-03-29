"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
  ChartData,
  ChartOptions,
  Plugin,
} from "chart.js";

Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend, PolarAreaController);

export default function PolarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const skillLabels = ["Frontend", "Backend", "DevOps", "Cloud", "Testing", "UI"];
  const skillValues = [85, 72, 90, 60, 78, 40];

  const getColor = (val: number) => {
    if (val >= 80) return "rgba(0,255,136,0.8)";
    if (val >= 60) return "rgba(0,185,126,0.8)";
    return "rgba(0,122,86,0.8)";
  };

  const getResumo = (value: number) => {
    if (value >= 85) return "Domínio técnico sólido e atualizado.";
    if (value >= 70) return "Alta performance e versatilidade.";
    if (value >= 50) return "Boa base, com espaço para crescimento.";
    return "Habilidade em desenvolvimento, foco em evolução.";
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const glowPlugin: Plugin<"polarArea"> = {
      id: "glow",
      beforeDatasetDraw(chart) {
        const ctx = chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,255,136,0.35)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      },
      afterDatasetDraw(chart) {
        chart.ctx.restore();
      },
    };

    const data: ChartData<"polarArea"> = {
      labels: skillLabels,
      datasets: [
        {
          label: "Skill Level",
          data: skillValues,
          backgroundColor: skillValues.map(getColor),
          borderColor: "#00ffaa",
          borderWidth: 1,
          hoverOffset: 15,
        },
      ],
    };

    const options: ChartOptions<"polarArea"> = {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (_, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          setActiveIndex(index);
        } else {
          setActiveIndex(null);
        }
      },
      scales: {
        r: {
          angleLines: { color: "rgba(255,255,255,0.05)" },
          grid: { color: "rgba(255,255,255,0.05)" },
          pointLabels: {
            color: "#ccc",
            font: { size: 12 },
          },
          ticks: {
            color: "#00ff88",
            backdropColor: "transparent",
            font: { size: 10 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f1f1d",
          titleColor: "#00ffcc",
          bodyColor: "#ccc",
          borderColor: "#00ff88",
          borderWidth: 1,
        },
      },
    };

    const chart = new Chart(ctx, {
      type: "polarArea",
      data,
      options,
      plugins: [glowPlugin],
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="relative w-full max-w-[560px] h-auto flex flex-col md:flex-row items-center justify-between p-6 rounded-xl overflow-hidden gap-6">
      
      {/* Detalhes Interativos - Responsivo à esquerda */}
      <div className="w-[22%] min-w-[120px] text-left">
      {activeIndex !== null ? (
    <div className="animate-fade-in">
      <h3 className="text-[#00ffcc] text-xl font-bold mb-2">
        {skillLabels[activeIndex]}
      </h3>
      <p className="text-sm text-[#ccc] mb-1">
        <span className="text-[#00ffaa] font-semibold">
          {skillValues[activeIndex]}%
        </span>{" "}
        de domínio técnico.
      </p>
      <p className="text-xs text-[#aaa] italic mb-3 leading-snug">
        {getResumo(skillValues[activeIndex])}
      </p>
      <div className="h-[4px] rounded-full bg-[#00ffaa44] w-full">
        <div
          className="h-full rounded-full bg-[#00ffaa] transition-all duration-500"
          style={{ width: `${skillValues[activeIndex]}%` }}
        ></div>
      </div>
    </div>
        ) : null}
        </div>

        {/* 🔧 Canvas do Chart */}
  <div className="w-[48%] min-w-[220px] flex items-center justify-center">
    <canvas ref={chartRef} className="w-full h-full" />
  </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
