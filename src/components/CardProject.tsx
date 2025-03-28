"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language?: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface CardProjectProps {
  repos: Repo[];
  paused: boolean;
  setPaused: (value: boolean) => void;
  direction?: "left" | "right";
  marginTop?: number; // número direto em px
}

export default function CardProject({
  repos,
  paused,
  setPaused,
  direction = "right",
  marginTop = 0, // por padrão sem espaço
}: CardProjectProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    function step() {
      const container = carouselRef.current;
      if (!container) return;

      const scrollAmount = direction === "left" ? -1 : 1;
      container.scrollLeft += scrollAmount;

      if (container.scrollLeft <= 0 && direction === "left") {
        container.scrollLeft = container.scrollWidth / 2;
      }
      if (
        container.scrollLeft >= container.scrollWidth / 2 &&
        direction === "right"
      ) {
        container.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(step);
    }

    if (!paused) {
      animationRef.current = requestAnimationFrame(step);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [paused, repos, direction]);

  const handleScrollControl = (_: boolean, e: any) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    let startX = 0;
    let scrollLeft = 0;

    if (e.type === "mousedown" || e.type === "touchstart") {
      startX =
        e.type === "mousedown"
          ? e.pageX - container.offsetLeft
          : e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    }

    const onMove = (moveEvent: any) => {
      const x =
        moveEvent.type === "mousemove"
          ? moveEvent.pageX - container.offsetLeft
          : moveEvent.touches[0].pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    const onEnd = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      setPaused(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
  };

  return (
    <div
      className="relative p-5 group h-[240px]"
      style={{ 
        marginTop: `${marginTop}px`, 
        marginRight: '12px', // Exemplo de borda arredondada
        paddingBottom: '32px',
        bottom: '20px'
        
    }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={carouselRef}
        className="overflow-x-scroll flex space-x-3 scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar h-full"
        onMouseDown={(e) => handleScrollControl(true, e)}
        onTouchStart={(e) => handleScrollControl(true, e)}
      >
        {[...repos, ...repos].map((repo, index) => (
          <div
            key={index}
            className="w-[155px] h-[140px] bg-white/10 backdrop-blur-sm 
              rounded-xl border border-gray-800 p-4 flex-shrink-0 
              hover:shadow-[0_0_20px_rgba(0,255,250,0.6)] 
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
              {repo.stargazers_count}{" "}
              {repo.language ? `· ${repo.language}` : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
