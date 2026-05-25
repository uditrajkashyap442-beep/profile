"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticElement from "./MagneticElement";

const stackCategories = [
  {
    title: "Mobile Dev",
    items: ["React Native", "Expo", "TypeScript", "Android APK", "EAS"],
    color: "#FFD1DC" // Soft Pink
  },
  {
    title: "Backend",
    items: ["Java 21", "Spring Boot", "Node.js", "Python 3", "FastAPI", "PostgreSQL"],
    color: "#CDE2FF" // Soft Blue
  },
  {
    title: "Embedded",
    items: ["C++", "ESP32", "8051 MCU", "Verilog HDL", "I2C / SPI"],
    color: "#D0BCFF" // Soft Purple
  },
  {
    title: "Languages",
    items: ["Python", "Java", "C++", "TypeScript", "R", "Verilog"],
    color: "#FFD500" // Bright Yellow
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "HTML5/CSS3", "JavaScript", "Plotly"],
    color: "#06BA63" // Poppy Green
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "CI/CD", "Agile", "System Design", "Cloud Basics"],
    color: "#FF4757" // Poppy Red
  },
];

export default function Stack() {
  const containerRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Collect all unique items for the marquee
  const allItems = useMemo(() => {
    const seen = new Set();
    const unique = [];
    stackCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (!seen.has(item)) {
          seen.add(item);
          unique.push(item);
        }
      });
    });
    return unique;
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Vertical Sticky Card Stacking Effect ──
      const stickyContainers = gsap.utils.toArray(".stack-sticky-container");
      
      stickyContainers.forEach((container, index) => {
        // We only animate the scale/fade of a card when the NEXT card scrolls into view
        if (index === stickyContainers.length - 1) return; 

        const card = container.querySelector(".stack-card");
        const nextContainer = stickyContainers[index + 1];
        
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          yPercent: -5, // Restored the slide-up animation!
          ease: "none",
          scrollTrigger: {
            trigger: nextContainer, 
            start: "top bottom", 
            end: "top 25%", // Finishes animating right before it sticks
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="theme-section relative py-24 bg-[#FFD1DC] text-[#1A1A1A] z-10"
      data-bgcolor="#FFD1DC"
      data-textcolor="#1A1A1A"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 fixed-blobs">
        <div className="absolute w-[40vw] h-[40vw] bg-[#FFD500] rounded-full blur-[100px] opacity-40 -top-[10%] -right-[10%] animate-pulse" />
        <div className="absolute w-[50vw] h-[50vw] bg-white rounded-full blur-[120px] opacity-60 bottom-[20%] -left-[20%]" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 w-full px-6 mb-16 flex flex-col items-center">
        <div className="bg-white/50 px-4 py-2 rounded-full font-control-tnt text-xs text-[#FF4757] uppercase tracking-[0.2em] mb-4 font-bold shadow-sm backdrop-blur-md">
          TOOLS OF TRADE
        </div>
        <h2 className="font-control-compressed text-[clamp(60px,12vw,180px)] leading-[0.85] tracking-normal uppercase inline-block font-black text-[#1A1A1A]">
          THE STACK
        </h2>
        <div className="w-full max-w-7xl mx-auto border-b border-black/5 mt-8" />
      </div>

      {/* ── Infinite Marquee ── */}
      <div className="relative z-10 overflow-hidden w-full mb-24 bg-white/30 backdrop-blur-md py-4 border-y border-white/20 shadow-sm">
        <div className="marquee-track will-change-transform">
          {[1, 2, 3].map((groupIndex) => (
            <div key={groupIndex} className="inline-flex">
              {allItems.map((item, i) => (
                <span
                  key={`m${groupIndex}-${i}`}
                  className="inline-flex items-center px-6 py-3 mx-2 bg-white rounded-full font-control text-sm font-bold text-[#1A1A1A] whitespace-nowrap shadow-sm hover:scale-110 hover:bg-[#333896] hover:text-white transition-all duration-300 shrink-0 cursor-pointer border border-black/5"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Sticky Card Stacking Section ── */}
      <div className="relative z-10 w-full px-6 md:px-12 pb-32 flex flex-col items-center gap-[5vh]">
        {stackCategories.map((category, index) => {
          const isDimmed = hoveredCategory !== null && hoveredCategory !== index;
          // Dynamically compute a top offset so they stack nicely visually
          const stickyTop = `calc(15vh + ${index * 20}px)`;

          return (
            <div 
              key={index} 
              className="stack-sticky-container sticky w-full max-w-5xl"
              style={{ top: stickyTop }}
            >
              <div 
                data-cursor-text=""
                className={`stack-card flex flex-col p-8 md:p-12 w-full min-h-[45vh] rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all duration-500 will-change-transform origin-top ${isDimmed ? 'saturate-50' : 'saturate-100'}`}
                style={{ backgroundColor: category.color }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Category label */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
                  <h3 className="font-control-tnt text-2xl md:text-4xl font-bold text-[#1A1A1A] uppercase tracking-[0.1em]">
                    {category.title}
                  </h3>
                  <span className={`text-4xl transition-transform duration-300 text-[#1A1A1A] ${!isDimmed ? 'rotate-90' : 'rotate-0'}`}>✦</span>
                </div>

                {/* Items list — pill shape */}
                <div className="flex flex-wrap gap-4 mt-auto">
                  {category.items.map((item, i) => (
                    <MagneticElement key={i}>
                      <span className="inline-block bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full text-sm md:text-base font-bold text-[#1A1A1A] shadow-sm hover:bg-white hover:scale-105 transition-all hover-trigger pointer-events-auto">
                        {item}
                      </span>
                    </MagneticElement>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-16 pb-12">
        <div className="border-t border-black/5 pt-8 flex justify-between items-center">
          <span className="font-control-tnt text-xs text-[#1A1A1A]/60 uppercase tracking-widest font-bold bg-white/50 px-4 py-2 rounded-full">
            Always learning
          </span>
        </div>
      </div>
    </section>
  );
}
