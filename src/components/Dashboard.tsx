"use client";

import React from "react";
import CircleProgress from "./CircleProgress";
import Chart from "./Chart";
import Charts from "./Charts";
import ChartSkill from "./ChartSkill";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen px-4 py-2 text-white font-sans">

      {/* Wrapper dos dois charts */}
      <div className="flex justify-between items-start gap-8 w-full mt-10">

        {/* 
        <div className="flex-1 relative top-[50px] right-[20px] max-w-[65%] h-[400px]">
          <Charts />
        </div>

        <div className="flex-1 relative top-[140px] right-[20px] max-w-[65%] h-[400px]">
          <Chart />
        </div>
        */}

        {/* ChartSkill (radar + progress) */}
        <div className="w-[35%] relative bottom-[12em] left-[25em]">
          <ChartSkill />
        </div>
      </div>

      <style jsx>{`
        .glass {
          background: rgba(40, 65, 75, 0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 255, 255, 0.05);
          box-shadow: 0 0 12px rgba(0, 255, 250, 0.08);
        }
      `}</style>
    </div>
  );
}
