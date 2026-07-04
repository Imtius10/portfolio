"use client";

import { useEffect, useRef, useState } from "react";

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function AnimatedStat({ end, label, suffix = "", duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-center bg-white/5 backdrop-blur-md rounded-xl px-6 py-5 border border-white/10 shadow-lg shadow-black/10">
      <p className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-slate-400 text-sm uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat end={3} suffix="+" label="Projects Shipped" />
          <AnimatedStat end={15} suffix="+" label="Technologies" />
          <AnimatedStat end={100} suffix="+" label="Problems Solved" />
          <AnimatedStat end={3} suffix="+" label="Years Coding" />
        </div>
      </div>
    </section>
  );
}
