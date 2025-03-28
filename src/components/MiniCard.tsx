// components/MiniCard.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  language?: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface MiniCardProps {
  repos: Repo[];
}

export default function MiniCard({ repos }: MiniCardProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    function step() {
      const container = carouselRef.current;
      if (!container) return;
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      animationRef.current = requestAnimationFrame(step);
    }

    if (!paused) {
      animationRef.current = requestAnimationFrame(step);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [paused, repos]);

  const scrollLeft = () => {
    const container = carouselRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollBy({ left: -width, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = carouselRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollBy({ left: width, behavior: "smooth" });
  };

  return (
    <div className="relative group h-[220px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={carouselRef}
        className="overflow-x-scroll flex space-x-4 scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar h-full"
      >
        {[...repos, ...repos].map((repo, index) => (
          <div
            key={index}
            className="w-[160px] h-[160px] bg-white/10 backdrop-blur-sm 
            rounded-xl border border-gray-800 p-4 flex-shrink-0 
            hover:shadow-[0_0_20px_rgba(0,255,0,0.6)] 
            transition transform hover:scale-105 flex flex-col justify-between"
          >
            <div className="flex items-center mb-2">
              <Image
                src={repo.owner.avatar_url}
                alt={`Avatar de ${repo.owner.login}`}
                width={32}
                height={32}
                className="rounded-full flex-shrink-0"
              />
              <h3 className="ml-2 text-sm font-semibold text-gray-100 truncate max-w-[100px]">
                {repo.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
              <Image
                src="/images/react.png"
                alt="React"
                width={20}
                height={20}
                className="object-contain"
              />
              {repo.stargazers_count} {repo.language ? `· ${repo.language}` : ""}
            </div>
          </div>
        ))}
      </div>

      {/* Botão esquerda */}
      <button
        type="button"
        onClick={scrollLeft}
        className="absolute top-[300px] left-0 -ml-3 p-2 rounded-full bg-gray-800/70 text-gray-200 hover:text-white hover:bg-gray-800 hover:shadow-[0_0_8px_rgba(0,25,0,0.8)] focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Rolar para a esquerda"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Botão direita */}
      <button
        type="button"
        onClick={scrollRight}
        className="absolute top-[300px] right-0 -mr-3 p-2 rounded-full bg-gray-800/70 text-gray-200 hover:text-white hover:bg-gray-800 hover:shadow-[0_0_8px_rgba(0,255,0,0.8)] focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Rolar para a direita"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
