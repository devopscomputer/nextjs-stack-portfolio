"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGithubactions,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiSharp,
  SiGooglecloud,
} from "react-icons/si";
import { FaCogs, FaProjectDiagram, FaUserShield } from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";

const skills = [
  { label: "QA Lead", percent: 98, icon: FaUserShield },
  { label: "Arquitetura de Software", percent: 96, icon: MdArchitecture },
  { label: "C-Sharp", percent: 94, icon: SiSharp },
  { label: "React.js", percent: 95, icon: SiReact },
  { label: "Next.js", percent: 92, icon: SiNextdotjs },
  { label: "Node.js", percent: 90, icon: SiNodedotjs },
  { label: "TypeScript", percent: 88, icon: SiTypescript },
  { label: "PostgreSQL", percent: 85, icon: SiPostgresql },
  { label: "Python", percent: 84, icon: SiPython },
  { label: "Java", percent: 83, icon: FaProjectDiagram },
  { label: "Cloud", percent: 78, icon: SiGooglecloud },
];

const ChartSkill = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-10 text-white">
      <motion.h2
        className="text-sm text-center text-gray-400 mb-6 uppercase tracking-wider"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Visualize seu domínio técnico em áreas estratégicas
      </motion.h2>

      <div className="border-t border-white/10 my-4 w-full" />

      <div className="rounded-2xl shadow-xl p-6 max-w-md w-full">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-[20px] text-[#00ff99] animate-pulse drop-shadow-[0_0_5px_#00ff99]">
                <skill.icon />
              </span>
              {skill.label}
            </div>
            <div className="relative flex items-center justify-center w-[45px] h-[45px]">
              <CircleProgress percent={skill.percent} />
              <span className="text-[#00ff99] font-bold text-sm z-10">
                {skill.percent}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CircleProgress = ({ percent }: { percent: number }) => {
  const radius = 14;
  const stroke = 3;
  const normalizedRadius = radius - stroke;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (percent / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_6px_#00ff99]"
    >
      <circle
        stroke="rgba(255,255,255,0.1)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#00ff99"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.3s ease" }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ChartSkill;
