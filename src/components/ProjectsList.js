"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticElement from "./MagneticElement";

const projects = [
  { 
    name: "KAMIKATSU", 
    year: "2026", 
    type: "Personal", 
    url: "https://github.com/UditRajkashyap442-beep/kamikatsu-recycler", 
    tags: ["React Native", "Mobile", "UI/UX"],
    color: "#FF4757", // Poppy Red
    textColor: "#FFFFFF"
  },
  { 
    name: "BRIDGE SHM", 
    year: "2025", 
    type: "Embedded", 
    url: "https://github.com/UditRajkashyap442-beep/bridge-structural-health-monitoring", 
    tags: ["C++", "Sensors", "Hardware"],
    color: "#333896", // Deep Blue
    textColor: "#FFFFFF"
  },
  { 
    name: "SOLAR MPPT", 
    year: "2025", 
    type: "Hardware", 
    url: "https://github.com/UditRajkashyap442-beep/solar-mppt-charge-controller", 
    tags: ["Arduino", "Circuits", "Power"],
    color: "#FFD500", // Bright Yellow
    textColor: "#1A1A1A"
  },
  { 
    name: "DINING TIP", 
    year: "2024", 
    type: "Data Model", 
    url: "https://github.com/UditRajkashyap442-beep/dining-dynamic-tip-calculator", 
    tags: ["Python", "Data", "ML"],
    color: "#FA60BE", // Poppy Pink
    textColor: "#FFFFFF"
  },
];

export default function ProjectsList() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      
      // Calculate width manually or use scrollWidth with a safe fallback
      const getScrollAmount = () => {
        let totalWidth = track.scrollWidth;
        let viewportWidth = window.innerWidth;
        let dist = totalWidth - viewportWidth;
        return dist > 0 ? dist : 2000; // safe fallback
      };

      // Bulletproof horizontal scroll
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1.5, // Add 1.5s of smooth inertia to the horizontal pan
          invalidateOnRefresh: true,
        }
      });

      gsap.fromTo(".projects-title-reveal", 
        { y: "100%" },
        { y: "0%", duration: 1.2, ease: "back.out(1.5)", scrollTrigger: { trigger: containerRef.current, start: "top 80%" }}
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="projects"
      ref={containerRef}
      className="theme-section relative h-screen w-full overflow-hidden bg-[#F4F0EA]"
      data-bgcolor="#F4F0EA"
      data-textcolor="#1A1A1A"
    >
      <div className="absolute top-12 left-6 md:left-12 z-10 pointer-events-none">
        <h2 className="font-control-compressed text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-[#1A1A1A] overflow-hidden">
          <span className="projects-title-reveal inline-block">SELECTED <span className="text-[#FA60BE]">WORKS</span></span>
        </h2>
      </div>

      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="flex items-center flex-nowrap h-full gap-8 md:gap-12 px-[5vw] md:px-[10vw] pt-[20vh] md:pt-[25vh] pb-[5vh] w-max"
      >
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="VIEW"
            className="project-card relative flex flex-col justify-between w-[85vw] md:w-[60vw] lg:w-[40vw] h-[65vh] lg:h-[70vh] p-6 md:p-10 rounded-[32px] lg:rounded-[40px] shrink-0 group transition-transform duration-500 hover:scale-[1.02]"
            style={{ backgroundColor: p.color, color: p.textColor }}
          >
            <div className="flex justify-between items-start z-10">
              <div className="font-control-tnt text-xs font-bold tracking-widest uppercase opacity-80 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                {p.year}
              </div>
            </div>

            {/* Central Graphic Block */}
            <div className="project-image absolute inset-0 m-auto w-[60%] h-[45%] bg-white/10 rounded-[24px] border border-white/20 flex flex-col items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-700">
              
              {/* Dynamic Gradient Background (No filter:blur to prevent GPU crash) */}
              <div 
                className="absolute inset-0 opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${p.color} 0%, transparent 60%)`
                }}
              />
              <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>
              
              <span className="font-control-compressed text-[6rem] md:text-[9rem] font-black text-white/20 mix-blend-overlay tracking-tighter leading-none relative z-10">
                0{i + 1}
              </span>
            </div>

            {/* Bottom details */}
            <div className="z-10 mt-auto flex flex-col gap-4 md:gap-6">
              <h3 className="project-title font-control-compressed text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
                {p.name}
              </h3>
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {p.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full font-control-tnt text-[9px] md:text-xs font-bold text-white uppercase tracking-widest border border-white/30 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <MagneticElement>
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center text-xl md:text-3xl text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 transform -rotate-45 group-hover:rotate-0 shadow-lg cursor-pointer">
                    →
                  </div>
                </MagneticElement>
              </div>
            </div>
          </a>
        ))}
      </div>
      
    </div>
  );
}
