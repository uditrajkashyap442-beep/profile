"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const hardcodedProjects = [
  {
    name: "kamikatsu recycler",
    description: "Mobile app (React Native + Expo) that helps users properly dispose of products. Spring Boot backend with PostgreSQL storing 500+ products. Barcode lookup with Gemini AI fallback — ~90% recognition across 10+ markets.",
    tech: "React Native · Expo · TypeScript · Java 21 · Spring Boot · PostgreSQL · Gemini AI",
    url: "https://github.com/UditRajkashyap442-beep/kamikatsu-recycler",
    year: "2026",
  },
  {
    name: "bridge structural health monitoring",
    description: "Sensor node using FFT to track bridge vibration patterns and flag structural anomalies. ADXL345 accelerometer + HX711 load cell over I2C at 200 Hz sampling rate.",
    tech: "ESP32 · C++ · FFT Analysis · ADXL345 · HX711 · I2C",
    url: "https://github.com/UditRajkashyap442-beep/bridge-structural-health-monitoring",
    year: "2025",
  },
  {
    name: "solar mppt charge controller",
    description: "Solar charge controller using the Perturb & Observe algorithm to track Maximum Power Point. High-frequency PWM via TimerOne, ADC averaging for clean readings, multi-stage battery charging.",
    tech: "Arduino · C++ · DC-DC Boost Converter · PWM · ADC · I2C LCD",
    url: "https://github.com/UditRajkashyap442-beep/solar-mppt-charge-controller",
    year: "2025",
  },
  {
    name: "dining dynamic tip calculator",
    description: "Statistical data analysis pipeline with regression models to predict customer tipping behavior based on multiple variables.",
    tech: "R · ggplot2 · Statistical Modeling · NumPy",
    url: "https://github.com/UditRajkashyap442-beep/dining-dynamic-tip-calculator",
    year: "2024",
  },
];

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered row reveals
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: 80, skewY: 1.5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-32 bg-[#080810] text-white relative overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-8">
          <h2 className="font-sans font-black text-[clamp(48px,8vw,110px)] leading-[0.82] tracking-tighter uppercase">
            &quot;PROJECTS&quot;
          </h2>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest pb-2">
            2023 — 2026
          </div>
        </div>
      </div>

      {/* Project list */}
      <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10">
        {hardcodedProjects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group relative flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 py-10 md:py-14 px-6 md:px-12 transition-all duration-500 hover:bg-white/[0.03] hover-target"
          >
            {/* Index */}
            <div className="font-mono text-xs text-white/25 mb-3 md:mb-0 md:w-16 shrink-0 group-hover:text-[#FF3333] transition-colors duration-300">
              0{index + 1}
            </div>

            {/* Name */}
            <div className="flex-1 md:px-8">
              <h3 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-none group-hover:text-transparent transition-colors duration-400"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
              >
                &quot;{project.name}&quot;
              </h3>
              {/* Description revealed on hover — subtle */}
              <p className="font-mono text-xs text-white/0 group-hover:text-white/40 transition-all duration-500 mt-3 max-w-lg leading-relaxed tracking-tight">
                {project.description}
              </p>
            </div>

            {/* Tech + Year */}
            <div className="md:w-56 shrink-0 mt-4 md:mt-0 text-right hidden md:flex flex-col items-end gap-1">
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest group-hover:text-white/50 transition-colors">
                {project.year}
              </span>
              <span className="font-mono text-xs text-white/30 uppercase tracking-tight leading-relaxed group-hover:text-white/50 transition-colors">
                {project.tech}
              </span>
            </div>

            {/* Arrow indicator */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 text-[#FF3333] font-bold text-2xl">
              ↗
            </div>
          </a>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <a
          href="https://github.com/UditRajkashyap442-beep"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest hover-target group"
        >
          <span>View all on GitHub</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </section>
  );
}
